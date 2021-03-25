const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

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
    extensions: ['.ts', '.js', '.gjs', '.gts'],
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
        test: /(\.ts|\.js|\.gts|\.gjs)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@glimmerx/babel-preset', '@babel/preset-typescript', '@babel/preset-env'],
            },
          },
          '@glimmerx/webpack-loader',
        ],
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
        test: /(\.ts|\.js|\.gts|\.gjs)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@glimmerx/babel-preset',
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
          '@glimmerx/webpack-loader',
        ],
      },
    ],
  },
};

module.exports = [nodeConfig, browserConfig];
