const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  entry: {
    app: './packages/glimmer-lite-test-app/index.ts',
    tests: './packages/glimmer-lite-core/tests/index.ts'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: [ '.ts', '.js' ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};