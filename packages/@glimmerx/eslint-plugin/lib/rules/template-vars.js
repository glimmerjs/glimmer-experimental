const { getTemplateTokens } = require('@glimmerx/babel-plugin-component-templates');

module.exports = {
  docs: {
    description: 'Components / Helpers referenced in hbs template literals should not trigger no-unused-vars failures, but should trigger no-undef if they are not defined propery',
    category: 'Variables',
    recommended: true,
  },
  meta: {
    messages: {
      undefToken: 'Token {{ token }} is used in an hbs tagged template literal, but is not defined'
    },
    // example: '@glimmerx/glimmerx/template-vars': [2, 'unused-only', { nativeTokens: ['anImplicitToken'] }]
    schema: [
      // Configures whether to only prevent no-unused-vars errors ('unused-only), or also throw an eslint error when a template token is undefined ('all')
      {
        enum: ['unused-only', 'all'],
        default: 'all'
      },
      {
          type: 'object',
          properties: {
            // ['if', 'each'] will always be 'nativeTokens', but you may add more via this configuration. One use-case is if a token is added to the
            // Javascript code implicitly (such as via a babel transform)
            nativeTokens: {
              type: 'array',
              items: {
                type: 'string'
              }
            }
          },
          additionalProperties: false
      }
    ],
  },
  create(context) {
    const defaultNativeTokens = ['if', 'each'];
    let isGlimmerSfc = false;
    let hbsImportId;

    const [ mode = 'all', configOpts ] = context.options;
    let nativeTokens = defaultNativeTokens;

    if (configOpts && configOpts.nativeTokens) {
      nativeTokens = nativeTokens.concat(configOpts.nativeTokens);
    }

    return {
      ImportSpecifier(node) {
        if (isGlimmerSfc || node.parent.source.value !== '@glimmerx/component') {
          return;
        }
        const importedName = node.imported.name;
        const identifier = node.local.name;
        if (importedName === 'hbs') {
          isGlimmerSfc = true;
          hbsImportId = identifier;
        }
      },
      TaggedTemplateExpression(node) {
        if (!isGlimmerSfc || node.tag.name !== hbsImportId) {
          return;
        }
        const templateElementNode = node.quasi.quasis[0];
        const templateString = templateElementNode.value.raw;

        const templateScopeTokens = getTemplateTokens(templateString, nativeTokens);
        templateScopeTokens.forEach((token) => {
          const isTokenPresent = context.markVariableAsUsed(token);
          if (!isTokenPresent && mode === 'all') {
            context.report({
              data: {
                token
              },
              messageId: 'undefToken',
              node: templateElementNode,
            });
          }
        });
      }
    }
  },
};
