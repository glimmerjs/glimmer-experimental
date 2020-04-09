'use strict';

function makePrecompileTemplate(templateCompiler) {
  const precompileTemplate = (templateString, templateTokens, options) => {
    let compiled = templateCompiler.precompile(templateString, options);

    return `Ember.HTMLBars.template(${compiled})`;
  };

  precompileTemplate.baseDir = () => __dirname;

  return precompileTemplate;
}

module.exports = {
  name: require('./package').name,

  included(parent) {
    this._super.included.apply(this, arguments);

    let { hasPlugin, addPlugin } = require('ember-cli-babel-plugin-helpers');

    if (!hasPlugin(parent, '@glimmerx/babel-plugin-component-templates')) {
      const ember = this.project.findAddonByName('ember-source');
      const templateCompiler = require(ember.absolutePaths.templateCompiler);

      addPlugin(parent, [
        require.resolve('@glimmerx/babel-plugin-component-templates'),
        {
          ember: true,

          precompileTemplate: makePrecompileTemplate(templateCompiler),
        },
      ]);
    }
  },
};
