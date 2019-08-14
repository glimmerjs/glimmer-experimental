import plugin from '..';
import pluginTester from 'babel-plugin-tester';
import path from 'path';

pluginTester({
  plugin,
  fixtures: path.join(__dirname, 'fixtures')
});