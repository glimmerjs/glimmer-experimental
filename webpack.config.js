const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  entry: {
    app: './packages/example-app/index.ts',
    tests: './packages/@glimmerx/core/tests/index.ts',
    nodeTests: './packages/@glimmerx/ssr/tests/index.ts',
  },
  mode: 'development',
  externals: {
    fs: 'fs',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [path.resolve(__dirname, 'packages/@glimmerx')],
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              ['@glimmer/babel-plugin-glimmer-env', { DEBUG: true }],
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
            ],
            presets: ['@babel/preset-typescript', '@babel/preset-env'],
          },
        },
      },
      {
        test: /\.ts$/,
        include: [path.resolve(__dirname, 'packages/example-app')],
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              '@glimmerx/babel-plugin-component-templates',
              ['@glimmer/babel-plugin-glimmer-env', { DEBUG: true }],
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
            ],
            presets: ['@babel/preset-typescript', '@babel/preset-env'],
          },
        },
      },
    ],
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
};
