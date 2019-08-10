const syntaxClassProperties = require('@babel/plugin-syntax-class-properties').default;
const { precompile } = require('@glimmer/compiler');
const { addNamed } = require('@babel/helper-module-imports');

module.exports = function(babel) {
  const { types: t, parse } = babel;

  return {
    name: 'glimmer-plugin',
    inherits: syntaxClassProperties,
    visitor: {
      Program(programPath) {
        programPath.traverse({
          ClassProperty(path) {
            if (!path.node.static || path.node.key.name !== 'template') {
              return;
            }

            let setter = addNamed(programPath, 'setComponentTemplate', 'glimmer-lite-core', { importedType: 'es6' });
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
      }
    },
  };

  function insertTemplateWrapper(path, setter) {
    const klass = path.findParent(path => path.isClassExpression() || path.isClassDeclaration());
    const template = buildTemplate(path);

    if (klass.isClassExpression()) {
      klass.replaceWith(
        t.callExpression(setter, [klass.node, template])
      );
    } else {
      const klassId = klass.node.id;

      klass.insertAfter(t.callExpression(setter, [klassId, template]));
    }
  }

  function buildTemplate(path) {
    const templateSource = getTemplateString(path);
    const compiled = precompile(templateSource);
    const ast = parse(`(${compiled})`);

    t.traverseFast(ast, node => {
      if (t.isObjectProperty(node)) {
        if (node.key.value === 'meta') {
          node.value.properties.push(buildScopeFunction(path));
        }
        if (t.isStringLiteral(node.key)) {
          node.key = t.identifier(node.key.value);
        }
      }
    });
    return ast.program.body[0].expression;
  }

  function buildScopeFunction(path) {
    const parentScope = path.scope.getProgramParent();
    const bindings = Object.values(parentScope.bindings);

    return t.objectProperty(
      t.identifier('scope'),
      t.arrowFunctionExpression(
        [],
        t.objectExpression(
          bindings.map(binding => {
            const { identifier } = binding;
            binding.reference(path);
            return t.objectProperty(identifier, identifier, false, true);
          })
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
}
