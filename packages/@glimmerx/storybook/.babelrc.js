// this for compiling the server & client code for Storybook APIs
module.exports = {
  presets: [
    ['@babel/preset-env', { shippedProposals: true, useBuiltIns: 'usage', corejs: '3' }],
    '@babel/preset-typescript',
  ],
  overrides: [
    {
      test: ['**/src/server/**', '**/src/bin/**'],
      presets: [
        [
          '@babel/preset-env',
          {
            shippedProposals: true,
            useBuiltIns: 'usage',
            targets: {
              node: 'current',
            },
            corejs: '3',
          },
        ],
      ],
    },
  ],
};
