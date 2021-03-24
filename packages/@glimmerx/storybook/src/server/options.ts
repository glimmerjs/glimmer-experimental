// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('../../package.json');

export default {
  packageJson,
  framework: 'glimmerx',
  frameworkPath: '@glimmerx/storybook',
  frameworkPresets: [require.resolve('./framework-preset-glimmer.js')],
};
