const { precompile } = require('@glimmer/compiler');
const { addNamed } = require('@babel/helper-module-imports');
const { traverse, preprocess } = require('@glimmer/syntax');

function tokensFromType(node, scopedTokens) {
  const tokensMap = {
    PathExpression: (node) => {
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
      if (char !== char.toUpperCase()) {
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

function addTokens(tokensSet, node, scopedTokens) {
  const maybeTokens = tokensFromType(node, scopedTokens);
  (Array.isArray(maybeTokens) ? maybeTokens : [maybeTokens]).forEach(maybeToken => {
    if (maybeToken !== undefined) {
      tokensSet.add(maybeToken);
    }
  });
}

function getTemplateTokens(html) {
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
      addTokens(tokensSet, node, scopedTokens);
    },
  });
  return Array.from(tokensSet);
}

module.exports = function(babel, options) {
  const { types: t, parse } = babel;
  const { importPath = '@glimmerx/core', importName = 'setComponentTemplate' } = options || {};

  function maybeAddTemplateSetterImport(state, programPath) {
    if (state.templateSetter) {
      return state.templateSetter;
    }

    return (state.templateSetter = addNamed(programPath, importName, importPath, {
      importedType: 'es6',
    }));
  }

  return {
    name: '@glimmerx/babel-plugin-glimmer-components',
    manipulateOptions({ parserOpts }) {
      parserOpts.plugins.push(['classProperties']);
    },
    visitor: {
      Program(programPath, state) {
        programPath.traverse({
          ClassProperty(path) {
            if (!path.node.static || path.node.key.name !== 'template') {
              return;
            }

            let setter = maybeAddTemplateSetterImport(state, programPath);
            insertTemplateWrapper(path, setter);
            path.remove();
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

  function insertTemplateWrapper(path, setter) {
    const klass = path.findParent(path => path.isClassExpression() || path.isClassDeclaration());
    const template = buildTemplate(path);

    if (klass.isClassExpression()) {
      klass.replaceWith(t.callExpression(setter, [klass.node, template]));
    } else {
      const klassId = klass.node.id;

      klass.insertAfter(t.callExpression(setter, [klassId, template]));
    }
  }

  function buildTemplate(path) {
    const templateSource = getTemplateString(path);
    const templateScopeTokens = getTemplateTokens(templateSource);
    const compiled = precompile(templateSource);
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
