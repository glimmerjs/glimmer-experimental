import plugin from '..';
import pluginTester from 'babel-plugin-tester';
import path from 'path';
import astTransformTestPluginOptions from './fixtures-options/precompile/ast-transform/options';
import disabledPrecompilePluginOptions from './fixtures-options/precompile/disabled/options';

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
    {
      title: 'options.precompile : ast transfrom hbs only',
      fixture: path.join(__dirname, 'fixtures-options/precompile/ast-transform-hbs/code.js'),
      outputFixture: path.join(__dirname, 'fixtures-options/precompile/ast-transform-hbs/output.js'),
      pluginOptions: astTransformTestPluginOptions,
    },
    {
      title: 'options.precompile : disabled',
      fixture: path.join(__dirname, 'fixtures-options/precompile/disabled/code.js'),
      outputFixture: path.join(__dirname, 'fixtures-options/precompile/disabled/output.js'),
      pluginOptions: disabledPrecompilePluginOptions,
    },
    {
      title: 'options.precompile : disabled hbs only',
      fixture: path.join(__dirname, 'fixtures-options/precompile/disabled-hbs/code.js'),
      outputFixture: path.join(__dirname, 'fixtures-options/precompile/disabled-hbs/output.js'),
      pluginOptions: disabledPrecompilePluginOptions,
    }
  ],
});
