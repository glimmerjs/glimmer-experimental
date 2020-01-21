const { precompile } = require('@glimmer/compiler');
const { addNamed, addDefault } = require('@babel/helper-module-imports');
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
    if (maybeToken !== undefined && !nativeTokens.includes(maybeToken)) {
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
    importPath = '@glimmerx/core',
    importName = 'setComponentTemplate',
    precompile: precompileOptions,
  } = options || {};

  const isPrecompileDisabled = precompileOptions && precompileOptions.disabled === true;

  function maybeAddTemplateSetterImport(state, programPath) {
    if (state.templateSetter) {
      return state.templateSetter;
    }

    return (state.templateSetter = addNamed(programPath, importName, importPath, {
      importedType: 'es6',
    }));
  }

  function maybeAddGlimmerInlinePrecompileImport(state, programPath) {
    if (!state.glimmerInlinePrecompile) {
      state.glimmerInlinePrecompile = addDefault(programPath, 'glimmer-inline-precompile', {
        nameHint: 'hbs',
      });
    }

    return state.glimmerInlinePrecompile;
  }

  return {
    name: '@glimmerx/babel-plugin-glimmer-components',
    manipulateOptions({ parserOpts }) {
      parserOpts.plugins.push(['classProperties']);
    },
    visitor: {
      Program(programPath, state) {
        programPath.traverse({
          ImportSpecifier(path) {
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
          ImportDefaultSpecifier(path) {
            if (state.glimmerComponentImportId || path.parent.source.value !== '@glimmerx/component') {
              return;
            }
            const localName = path.node.local.name;
            state.glimmerComponentImportId = localName;
          },
          TaggedTemplateExpression(path) {
            const parentNode = path.parent;
            if (path.node.tag.name !== state.hbsImportId) {
              return;
            }

            /**
             * If its a hbs`....` only template then convert it into
             * class extends Component { static template = hbs`....`;}
             * first and then compile
             */
            if (
              parentNode.type !== 'ClassProperty' ||
              !parentNode.static ||
              parentNode.key.name !== 'template'
            ) {
              if (!state.glimmerComponentImportId) {
                state.glimmerComponentImportId = addDefault(programPath, '@glimmerx/component', {
                  nameHint: 'Component',
                }).name;
              }

              let taggedTemplateExpression = t.TaggedTemplateExpression(t.Identifier(state.hbsImportId), t.TemplateLiteral([...path.node.quasi.quasis], []));
              const ClassTemplateProperty = t.ClassProperty(t.Identifier('template'), taggedTemplateExpression, null, null);
              ClassTemplateProperty.static = true;
              path.replaceWith(
                t.ClassExpression(
                  null,
                  t.Identifier(state.glimmerComponentImportId),
                  t.ClassBody([ClassTemplateProperty])
                )
              );
              return;
            }

            let setter = maybeAddTemplateSetterImport(state, programPath);
            let hbsImportId = isPrecompileDisabled
              ? maybeAddGlimmerInlinePrecompileImport(state, programPath)
              : null;
            insertTemplateWrapper(path.parentPath, { setter, hbsImportId });
            path.parentPath.remove();
          },
        });
        // Babel TypeScript transform strips any bindings that aren't
        // referenced, so we need to retain any values referenced in the
        // template but not the JavaScript. There's a better way to do this when
        // we generate the identifiers for the scope function.
        const bindings = Object.values(programPath.scope.getAllBindings());
        bindings.forEach(binding => {
          binding.reference(programPath);
        });
      },
    },
  };

  function insertTemplateWrapper(path, { setter, hbsImportId }) {
    const klass = path.findParent(path => path.isClassExpression() || path.isClassDeclaration());

    const template = isPrecompileDisabled
      ? buildLooseTemplate(path, hbsImportId) // Loosely compile templates, do not transform to op codes.
      : buildTemplate(path);

    if (klass.isClassExpression()) {
      klass.replaceWith(t.callExpression(setter, [klass.node, template]));
    } else {
      const klassId = klass.node.id;

      klass.insertAfter(t.callExpression(setter, [klassId, template]));
    }
  }

  function buildLooseTemplate(path, hbsImportId) {
    function getTaggedTemplateExpression(path) {
      const stringNode = path.node.value;
      if (t.isTaggedTemplateExpression(stringNode)) {
        return stringNode;
      }
    }

    const compiledTemplateIdentifier = t.identifier('compiledTemplate');

    const taggedTemplateExpression = getTaggedTemplateExpression(path);

    taggedTemplateExpression.tag = hbsImportId; // Update the tag to be the same as our importId

    const compiledTemplateStatement = t.variableDeclaration('const', [
      t.variableDeclarator(compiledTemplateIdentifier, taggedTemplateExpression),
    ]);

    const templateSource = getTemplateString(path);
    const templateScopeTokens = getTemplateTokens(templateSource);

    const left = t.memberExpression(
      t.memberExpression(compiledTemplateIdentifier, t.identifier('meta')),
      t.identifier('scope')
    );

    const scopeStatement = t.expressionStatement(
      t.assignmentExpression('=', left, buildScopeFunction(path, templateScopeTokens).value)
    );

    const callExpression = t.callExpression(
      t.arrowFunctionExpression(
        [],
        t.blockStatement([
          compiledTemplateStatement,
          scopeStatement,
          t.returnStatement(compiledTemplateIdentifier),
        ])
      ),
      []
    );

    return callExpression;
  }

  function buildTemplate(path) {
    const templateSource = getTemplateString(path);
    const templateScopeTokens = getTemplateTokens(templateSource);
    const compiled = precompile(templateSource, precompileOptions);
    const ast = parse(`(${compiled})`);

    t.traverseFast(ast, node => {
      if (t.isObjectProperty(node)) {
        if (node.key.value === 'meta') {
          node.value.properties.push(buildScopeFunction(path, templateScopeTokens));
        }
        if (t.isStringLiteral(node.key)) {
          node.key = t.identifier(node.key.value);
        }
      }
    });
    return ast.program.body[0].expression;
  }

  function buildScopeFunction(path, templateScopeTokens) {
    const parentScope = path.scope.getProgramParent();
    const bindings = Object.values(parentScope.bindings);

    return t.objectProperty(
      t.identifier('scope'),
      t.arrowFunctionExpression(
        [],
        t.objectExpression(
          bindings
            .map(binding => {
              const { identifier } = binding;
              binding.reference(path);
              return t.objectProperty(t.identifier(identifier.name), identifier, false, false);
            })
            .filter(prop => templateScopeTokens.includes(prop.key.name))
        )
      )
    );
  }

  function getTemplateString(path) {
    const stringNode = path.node.value;

    if (t.isTaggedTemplateExpression(stringNode)) {
      return stringNode.quasi.quasis[0].value.raw;
    }
    return path.node.value.quasis[0].value.raw;
  }
};

module.exports.getTemplateTokens = getTemplateTokens;
