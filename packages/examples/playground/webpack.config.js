const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = () => {
  const IS_PRODUCTION = process.env.NODE_ENV === 'production';

  const entry = {
    app: './src/index.ts',
  };

  const plugins = [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      excludeChunks: ['tests'],
    }),
    new CopyPlugin([{ from: 'public', to: 'public' }]),
    new MonacoWebpackPlugin(),
  ];

  // Include tests in development builds
  if (!IS_PRODUCTION) {
    entry.tests = glob.sync('./tests/**/*.test.js');

    plugins.push(
      new HtmlWebpackPlugin({
        filename: 'tests/index.html',
        template: './tests/index.html',
        inject: false,
        chunks: ['tests'],
      })
    );
  }

  return {
    mode: IS_PRODUCTION ? 'production' : 'development',
    entry,
    plugins,
    node: {
      fs: 'empty',
      path: 'empty',
    },
    module: {
      rules: [
        {
          test: /\.(js|mjs|ts)$/,
          use: ['babel-loader', '@glimmerx/webpack-loader'],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(woff(2)?|ttf|eot|png|svg|jpg|gif)$/,
          loader: 'file-loader',
          options: {
            outputPath: 'images',
          },
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js', '.json'],
      alias: {
        path: require.resolve('path-browserify'),
      },
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: process.env.TESTEM ? '/' : '',
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
    },
  };
};
