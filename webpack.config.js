const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  entry: {
    app: './packages/glimmer-lite-test-app/index.ts',
    tests: './packages/glimmer-lite-core/tests/index.ts',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [
          path.resolve(__dirname, 'packages/glimmer-lite-core')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
            ],
            presets: ['@babel/preset-typescript'],
          },
        },
      },
      {
        test: /\.ts$/,
        include: [
          path.resolve(__dirname, 'packages/glimmer-lite-test-app')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              'babel-plugin-glimmer-component',
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
            ],
            presets: ['@babel/preset-typescript'],
          },
        },
      },
    ],
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
