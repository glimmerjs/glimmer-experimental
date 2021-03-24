function defaultTo(value, defaultVal) {
  return value === undefined ? defaultVal : value;
}

module.exports = function (api, options) {
  let __loadPlugins = defaultTo(options.__loadPlugins, false);

  return {
    presets: [
      [
        __loadPlugins ? require('@glimmer/babel-preset') : require.resolve('@glimmer/babel-preset'),
        {
          ...options,
          __customInlineTemplateModules: {
            '@glimmerx/component': {
              export: 'hbs',
              useTemplateLiteralProposalSemantics: 1,
            },

            'TEMPLATE-TAG-MODULE': {
              export: 'GLIMMER_TEMPLATE',
              debugName: '<template>',
              useTemplateTagProposalSemantics: 1,
            },
          },
        },
      ],
    ],
  };
};
