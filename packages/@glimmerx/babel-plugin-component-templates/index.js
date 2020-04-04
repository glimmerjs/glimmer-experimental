const { precompileTemplate } = require('@glimmer/babel-plugin-strict-template-precompile');
const { addNamed } = require('@babel/helper-module-imports');
const { traverse, preprocess } = require('@glimmer/syntax');

/* AST.Node reference: https://github.com/glimmerjs/glimmer-vm/blob/master/packages/%40glimmer/syntax/lib/types/nodes.ts#L268 */

/**
 * Gets the correct Token from the Node based on it's type
 * @param {AST.Node} node - the node to extract tokens from
 * @param {string[]} scopedTokens - An array of scoped tokens
 * @returns {string} A tag to add to the list of tokens
 */
function tokensFromType(node, scopedTokens) {
  const tokensMap = {
    PathExpression: node => {
      if (node.data === true || node.this === true) {
        return;
      }
      const [possbleToken] = node.parts;
      if (!scopedTokens.includes(possbleToken)) {
        return possbleToken;
      }
    },
    ElementNode: ({ tag }) => {
      const char = tag.charAt(0);
      if (char !== char.toUpperCase() || char === ':') {
        return;
      }
      if (scopedTokens.includes(tag)) {
        return;
      }
      return tag;
    },
  };
  if (node.type in tokensMap) {
    return tokensMap[node.type](node);
  }
}

/**
 * Adds tokens to the tokensSet based on their node.type
 *
 * @param {Set<string>} tokensSet The current Set of unique tokens
 * @param {AST.Node} node - the node to extract tokens from
 * @param {string | string[]} scopedTokens - a list, or single string of tokens
 * @param {string[]} [nativeTokens] - An optional param of nativeTokens to exclude from the list (ex. ['if', 'each'])
 */
function addTokens(tokensSet, node, scopedTokens, nativeTokens = []) {
  const maybeTokens = tokensFromType(node, scopedTokens);
  (Array.isArray(maybeTokens) ? maybeTokens : [maybeTokens]).forEach(maybeToken => {
    if (
      maybeToken !== undefined &&
      !nativeTokens.includes(maybeToken) &&
      !maybeToken.startsWith('@')
    ) {
      tokensSet.add(maybeToken);
    }
  });
}

/**
 * Parses and traverses a given handlebars html template to extract all tokens referenced
 * that will come from the parent scope
 *
 * @param {string} html The handlebars html to process into an AST and traverse
 * @param {string[]} [nativeTokens] - An optional param of nativeTokens to exclude from the list (ex. ['if', 'each'])
 * @returns {string[]} The list of token names
 */
function getTemplateTokens(html, nativeTokens) {
  const ast = preprocess(html);
  const tokensSet = new Set();
  const scopedTokens = [];

  traverse(ast, {
    Block: {
      enter({ blockParams }) {
        blockParams.forEach(param => {
          scopedTokens.push(param);
        });
      },
      exit({ blockParams }) {
        blockParams.forEach(() => {
          scopedTokens.pop();
        });
      },
    },
    ElementNode: {
      enter(node) {
        node.blockParams.forEach(param => {
          scopedTokens.push(param);
        });
        addTokens(tokensSet, node, scopedTokens);
      },
      exit({ blockParams }) {
        blockParams.forEach(() => {
          scopedTokens.pop();
        });
      },
    },
    All(node) {
      addTokens(tokensSet, node, scopedTokens, nativeTokens);
    },
  });
  return Array.from(tokensSet);
}

module.exports = function(babel, options) {
  const { types: t, parse } = babel;
  const {
    setTemplatePath = '@glimmer/core',
    setTemplateName = 'setComponentTemplate',
    createTemplatePath = '@glimmer/core',
    createTemplateName = 'createTemplate',
    templateOnlyComponentPath = '@glimmer/core',
    templateOnlyComponentName = 'templateOnlyComponent',
    precompile: precompileOptions,
  } = options || {};

  const shouldPrecompile = !(precompileOptions && precompileOptions.disabled);

  function maybeAddSetTemplateImport(state, programPath) {
    if (!state.setTemplateId) {
      state.setTemplateId = addNamed(programPath, setTemplateName, setTemplatePath, {
        importedType: 'es6',
      }).name;
    }

    return state.setTemplateId;
  }

  function maybeAddCreateTemplateImport(state, programPath) {
    if (!state.createTemplateId) {
      state.createTemplateId = addNamed(programPath, createTemplateName, createTemplatePath, {
        importedType: 'es6',
      }).name;
    }

    return state.createTemplateId;
  }

  function maybeAddTemplateOnlyComponentImport(state, programPath) {
    if (!state.templateOnlyComponentImportId) {
      state.templateOnlyComponentImportId = addNamed(
        programPath,
        templateOnlyComponentName,
        templateOnlyComponentPath,
        {
          importedType: 'es6',
        }
      ).name;
    }

    return state.templateOnlyComponentImportId;
  }

  return {
    name: '@glimmerx/babel-plugin-glimmer-components',
    manipulateOptions({ parserOpts }) {
      parserOpts.plugins.push(['classProperties']);
    },
    visitor: {
      // This visitor exists to add an extra reference to all template bindings
      // so they don't get removed eagerly. This is because we may end up using
      // them later on and adding a reference ourselves.
      Program: {
        enter(path, state) {
          const parentScope = path.scope.getProgramParent();

          // Get the bindings and filter out any that are typescript types
          const bindings = Object.values(parentScope.bindings).filter(
            b => !b.referencePaths.some(p => p.parent.type === 'TSTypeReference')
          );

          if (bindings.length === 0) return;

          // create a new empty node to add a reference to in the binding
          let firstNode = path.get('body.0');
          firstNode.insertBefore(t.noop());
          firstNode = path.get('body.0');

          bindings.forEach(b => b.reference(firstNode));

          // save the node and original bindings off to remove on exit
          state.originalBindings = bindings;
          state.emptyPath = firstNode;
        },

        exit(path, state) {
          if (state.originalBindings) {
            // dereference all the original bindings, and remove the empty path
            state.originalBindings.forEach(b => b.dereference(state.emptyPath));
            state.emptyPath.remove();
          }
        },
      },

      ImportDefaultSpecifier(path, state) {
        if (state.glimmerComponentImportId || path.parent.source.value !== '@glimmerx/component') {
          return;
        }
        const localName = path.node.local.name;
        state.glimmerComponentImportId = localName;
      },

      ImportSpecifier(path, state) {
        if (state.hbsImportId || path.parent.source.value !== '@glimmerx/component') {
          return;
        }
        const importedName = path.node.imported.name;
        const localName = path.node.local.name;
        if (importedName === 'hbs') {
          state.hbsImportId = localName;
          // remove the hbs named import
          if (path.parentPath.node.specifiers.length > 1) {
            path.remove();
          } else {
            path.parentPath.remove();
          }
        }
      },

      ClassExpression(path, state) {
        const classBody = path.get('body').get('body');
        const templateProp = findTemplateProperty(classBody, state.hbsImportId);

        if (templateProp) {
          insertTemplateWrapper(path.scope.getProgramParent().path, path, templateProp, state);
          templateProp.remove();
        }
      },

      ClassDeclaration(path, state) {
        const classBody = path.get('body').get('body');
        const templateProp = findTemplateProperty(classBody, state.hbsImportId);

        if (templateProp) {
          insertTemplateWrapper(path.scope.getProgramParent().path, path, templateProp, state);
          templateProp.remove();
        }
      },

      TaggedTemplateExpression(path, state) {
        if (path.node.tag.name !== state.hbsImportId) {
          return;
        }

        let programPath = path.scope.getProgramParent().path;

        const setTemplateId = maybeAddSetTemplateImport(state, programPath);
        const templateOnlyId = maybeAddTemplateOnlyComponentImport(state, programPath);

        const templateNode = shouldPrecompile
          ? buildTemplate(path)
          : buildCreateTemplate(path, programPath, state);

        path.replaceWith(
          t.callExpression(t.identifier(setTemplateId), [
            templateNode,
            t.callExpression(t.identifier(templateOnlyId), []),
          ])
        );
      },
    },
  };

  function findTemplateProperty(classBody, hbsImportId) {
    return classBody.find(propPath => {
      return (
        propPath.node.static &&
        propPath.node.key.name === 'template' &&
        propPath.node.value.type === 'TaggedTemplateExpression' &&
        propPath.node.value.tag.name === hbsImportId
      );
    });
  }

  function insertTemplateWrapper(programPath, classPath, templatePath, state) {
    const setTemplateId = maybeAddSetTemplateImport(state, programPath);

    const template = shouldPrecompile
      ? buildTemplate(templatePath)
      : buildCreateTemplate(templatePath, programPath, state);

    if (classPath.isClassExpression()) {
      classPath.replaceWith(
        t.callExpression(t.identifier(setTemplateId), [template, classPath.node])
      );
    } else {
      const classId = classPath.node.id;

      classPath.insertAfter(t.callExpression(t.identifier(setTemplateId), [template, classId]));
    }
  }

  function getFilteredTemplateTokens(path, templateSource) {
    const templateScopeTokens = getTemplateTokens(templateSource);

    const filtered = [];
    const parentScope = path.scope.getProgramParent();

    Object.values(parentScope.bindings).forEach(binding => {
      binding.reference(path);

      if (templateScopeTokens.includes(binding.identifier.name)) {
        filtered.push(binding.identifier.name);
      }
    });

    return filtered;
  }

  function buildTemplate(path) {
    const templateSource = getTemplateString(path);
    const templateScopeTokens = getFilteredTemplateTokens(path, templateSource);

    const compiledTemplate = precompileTemplate(
      templateSource,
      templateScopeTokens,
      precompileOptions
    );

    let ast = parse(compiledTemplate);

    return ast.program.body[0].expression;
  }

  function buildCreateTemplate(path, programPath, state) {
    const createTemplateId = maybeAddCreateTemplateImport(state, programPath);
    const templateSource = getTemplateString(path);
    const tokens = getFilteredTemplateTokens(path, templateSource);

    const scopeObject = t.objectExpression(
      tokens.map(token => t.objectProperty(t.identifier(token), t.identifier(token), false, false))
    );

    return t.callExpression(t.identifier(createTemplateId), [
      scopeObject,
      t.templateLiteral([t.templateElement({ raw: templateSource })], []),
    ]);
  }

  function getTemplateString(path) {
    const stringNode = path.node.value || path.node;

    if (t.isTaggedTemplateExpression(stringNode)) {
      return stringNode.quasi.quasis[0].value.raw;
    }
    return path.node.value.quasis[0].value.raw;
  }
};

module.exports.getTemplateTokens = getTemplateTokens;
