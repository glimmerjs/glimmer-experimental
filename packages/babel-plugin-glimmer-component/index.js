export default function(babel) {
  const { types: t } = babel;

  return {
    name: 'glimmer-plugin',
    visitor: {
      ClassProperty(path) {
        if (!path.node.static || path.node.key.name !== 'template') {
          return;
        }

        insertTemplateWrapper(path);
      },
    },
  };

  function insertTemplateWrapper(path) {
    const klass = path.findParent(path => path.isClassDeclaration());
    klass.insertAfter(
      t.callExpression(t.identifier('setComponentTemplate'), [klass.node.id, buildHbs(path)])
    );
  }

  function buildHbs(path) {
    return t.callExpression(t.identifier('hbs'), [
      t.stringLiteral(getTemplateString(path)),
      buildScopeObject(path),
    ]);
  }

  function buildScopeObject(path) {
    const parentScope = path.scope.getProgramParent();
    const bindings = Object.values(parentScope.bindings);
    console.log(bindings);
    return t.arrowFunctionExpression(
      [],
      t.objectExpression(
        bindings.map(({ identifier }) => {
          return t.objectProperty(identifier, identifier, false, true);
        })
      )
    );
  }

  function getTemplateString(path) {
    return path.node.value.quasis[0].value.raw;
  }
}
