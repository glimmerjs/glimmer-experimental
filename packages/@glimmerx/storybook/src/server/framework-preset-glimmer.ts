// eslint-disable-next-line import/no-extraneous-dependencies
import { Configuration } from 'webpack';
let path = require('path');

export function webpack(config: Configuration) {
  return {
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                  },
                ],
              ],
              plugins: [
                '@glimmerx/babel-plugin-component-templates',
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                ['@babel/plugin-proposal-class-properties', { loose: true }],
              ],
            },
          },
        },
      ],
    },
    resolve: {
      plugins: [],
      extensions: ['.ts', '.js'],
      alias: {
        '@glimmerx/core$': path.join(__dirname, '../../node_modules/@glimmerx/core'),
        '@glimmerx/component$': path.join(__dirname, '../../node_modules/@glimmerx/component'),
      },
    },
  };
}
