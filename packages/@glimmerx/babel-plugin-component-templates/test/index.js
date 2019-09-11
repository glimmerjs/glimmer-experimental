import plugin from '..';
import pluginTester from 'babel-plugin-tester';
import path from 'path';
import astTransformTestPluginOptions from './fixtures-options/precompile/ast-transform/options';

pluginTester({
  plugin,
  fixtures: path.join(__dirname, 'fixtures'),
  tests: [
    {
      title: 'options.precompile : ast transfrom',
      fixture: path.join(__dirname, 'fixtures-options/precompile/ast-transform/code.js'),
      outputFixture: path.join(__dirname, 'fixtures-options/precompile/ast-transform/output.js'),
      pluginOptions: astTransformTestPluginOptions,
    },
  ],
});
