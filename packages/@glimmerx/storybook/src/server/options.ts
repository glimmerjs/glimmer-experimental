// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('../../package.json');

export default {
  packageJson,
  frameworkPresets: [require.resolve('./framework-preset-glimmer.js')],
};
