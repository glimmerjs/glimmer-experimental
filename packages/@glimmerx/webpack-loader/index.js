require('validate-peer-dependencies')(__dirname);

const { preprocessEmbeddedTemplates } = require('babel-plugin-htmlbars-inline-precompile');

const { getOptions } = require('loader-utils');
const { validate } = require('schema-utils');

const getTemplateLocalsRequirePath = require.resolve('@glimmer/syntax');

const schema = {
  type: 'object',
  properties: {
    test: {
      type: 'string',
    },
  },
};

const TEMPLATE_TAG_CONFIG = {
  getTemplateLocalsRequirePath,
  getTemplateLocalsExportPath: 'getTemplateLocals',

  templateTag: 'template',
  templateTagReplacement: 'GLIMMER_TEMPLATE',

  includeSourceMaps: true,
  includeTemplateTokens: true,
};

const TEMPLATE_LITERAL_CONFIG = {
  getTemplateLocalsRequirePath,
  getTemplateLocalsExportPath: 'getTemplateLocals',

  importIdentifier: 'hbs',
  importPath: '@glimmerx/component',

  includeSourceMaps: true,
  includeTemplateTokens: true,
};

module.exports = function (source) {
  const options = getOptions(this);

  validate(schema, options, {
    name: 'Glimmer Embedded Template Loader',
    baseDataPath: 'options',
  });

  let filename = this._module.resource;

  if (filename.match(/\.(js|ts)$/)) {
    let { output } = preprocessEmbeddedTemplates(
      source,
      Object.assign({ relativePath: filename }, TEMPLATE_LITERAL_CONFIG)
    );

    return output;
  } else if (filename.match(/\.(gjs|gts)$/)) {
    let { output } = preprocessEmbeddedTemplates(
      source,
      Object.assign({ relativePath: filename }, TEMPLATE_TAG_CONFIG)
    );

    return output;
  }

  return source;
};
