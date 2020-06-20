import plugin from '..';
import pluginTester from 'babel-plugin-tester';
import path from 'path';
import astTransformTestPluginOptions from './fixtures-options/precompile/ast-transform/options';
import customPrecompileTestPluginOptions from './fixtures-options/precompile/custom/options';
const { addNamed } = require('@babel/helper-module-imports');


// For correct .babelrc detection inside the fixture directory we need to force babel's cwd and root to be the package root.
// This will ensure that the tests will run correctly from the mono repo root or package root.
const packageRootPath = path.resolve(__dirname, '..');

pluginTester({
  plugin,
  babelOptions: {
    cwd: packageRootPath,
    root: packageRootPath
  },
  fixtures: path.join(__dirname, 'fixtures'),
  tests: [
    {
      title: 'options.precompile : ast transfrom',
      fixture: path.join(__dirname, 'fixtures-options/precompile/ast-transform/code.js'),
      outputFixture: path.join(__dirname, 'fixtures-options/precompile/ast-transform/output.js'),
      pluginOptions: astTransformTestPluginOptions,
    },
    {
      title: 'options.precompile : ast transfrom hbs only',
      fixture: path.join(__dirname, 'fixtures-options/precompile/ast-transform-hbs/code.js'),
      outputFixture: path.join(__dirname, 'fixtures-options/precompile/ast-transform-hbs/output.js'),
      pluginOptions: astTransformTestPluginOptions,
    },
    {
      title: 'options.precompile : custom precompile',
      fixture: path.join(__dirname, 'fixtures-options/precompile/custom/code.js'),
      outputFixture: path.join(__dirname, 'fixtures-options/precompile/custom/output.js'),
      pluginOptions: customPrecompileTestPluginOptions,
    },
  ],
});

pluginTester({
  plugin: () => { return { name: 'ordering-of-plugins', visitor: {} }},
  babelOptions: {
    cwd: packageRootPath,
    root: packageRootPath,
    plugins: [
      [addImport],
      [plugin],
      ['@babel/plugin-proposal-class-properties', { loose: true }]
    ]
  },
  fixtures: path.join(__dirname, 'fixtures-compat')
})

pluginTester({
  plugin: () => { return { name: 'ordering-of-plugins-precompile-options', visitor: {} }},
  babelOptions: {
    cwd: packageRootPath,
    root: packageRootPath,
    plugins: [
      [addImport],
      [plugin, {
        "precompile": {
          "disabled": true
        }
      }],
      ['@babel/plugin-proposal-class-properties', { loose: true }]
    ]
  },
  fixtures: path.join(__dirname, 'fixtures-compat-options')
})


function addImport() {
  return {
    name: 'introduce-import',
    visitor: {
      Program(path) {
        addNamed(path, 't', 't-helper');
        path.get('body').forEach(declaration => {
          declaration.isImportDeclaration() &&
            path.scope.registerDeclaration(declaration);
        });
      }
    }
  }
}
