'use strict';

const path = require('path');
const walkSync = require('walk-sync');
const dasherize = require('ember-cli-string-utils').dasherize;

const glimmerJsPath = path.dirname(require.resolve('@glimmer/blueprint'));
const glimmerJsFilesPath = path.join(glimmerJsPath, 'files');

module.exports = {
  description: 'Ember CLI blueprint for initializing a new GlimmerX application',

  locals(options) {
    const name = dasherize(options.entity.name);
    const blueprintVersion = require('./package').version;

    return {
      name,
      blueprintVersion,
      fileMap: {
        [glimmerJsFilesPath + '/']: '',
        gitignore: '.gitignore',
      },
    };
  },

  files() {
    let glimmerFiles = walkSync(glimmerJsFilesPath, { includeBasePath: true });
    let glimmerXFilesPath = this.filesPath(this.options);
    let glimmerXFiles = walkSync(glimmerXFilesPath);

    return glimmerFiles.map((file) => {
      if (glimmerXFiles.some((replacement) => file === `${glimmerJsFilesPath}/${replacement}`)) {
        return file.replace(glimmerJsFilesPath + '/', '');
      }

      return file;
    });
  },
};
