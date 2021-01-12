const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const commonBabelPlugins = [
  ['@glimmer/babel-plugin-glimmer-env', { DEBUG: false }],
  '@glimmerx/babel-plugin-component-templates',
  ['@babel/plugin-proposal-decorators', { legacy: true }],
  '@babel/plugin-proposal-class-properties',
];

const commonConfig = {
  mode: 'development',
  externals: {
    fs: 'fs',
  },
  resolve: {
    plugins: [
      new TsconfigPathsPlugin({
        mainFields: ['module', 'main'],
      }),
    ],
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    writeToDisk: true,
    before: (app) => {
      app.get('/rehydration', (req, res) => {
        const { default: handler } = require('./dist/rehydrationNodeServer.bundle.js');
        handler(req, res, './rehydration.bundle.js');
      });

      app.get('/partial-rehydration', (req, res) => {
        const { default: handler } = require('./dist/partialRehydrationNodeServer.bundle.js');
        handler(req, res, './partialRehydration.bundle.js');
      });
    },
  },
};

const browserConfig = {
  ...commonConfig,
  entry: {
    app: './packages/examples/basic/index.ts',
    rehydration: './packages/examples/rehydration/index.ts',
    partialRehydration: './packages/examples/partial-rehydration/index.ts',
    nodeTests: './tests/node.ts',
    tests: './tests/index.ts',
  },
  module: {
    rules: [
      {
        test: /(\.ts|\.js)$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: commonBabelPlugins,
            presets: ['@babel/preset-typescript', '@babel/preset-env'],
          },
        },
      },
    ],
  },
};

const nodeConfig = {
  ...commonConfig,
  devtool: false,
  entry: {
    rehydrationNodeServer: './packages/examples/rehydration/server.ts',
    partialRehydrationNodeServer: './packages/examples/partial-rehydration/server.ts',
  },
  externals: {
    ...commonConfig.externals,
    '@glimmer/validator': '@glimmer/validator',
  },
  output: {
    ...commonConfig.output,
    libraryTarget: 'umd',
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /(\.ts|\.js)$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: commonBabelPlugins,
            presets: [
              '@babel/preset-typescript',
              [
                '@babel/preset-env',
                {
                  targets: {
                    node: true,
                  },
                },
              ],
            ],
          },
        },
      },
    ],
  },
};

module.exports = [nodeConfig, browserConfig];
