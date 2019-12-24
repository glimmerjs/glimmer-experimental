// eslint-disable-next-line import/no-extraneous-dependencies
import { Configuration } from 'webpack';

export function webpack(config: Configuration) {
  return {
    ...config,
    externals: {
      fs: 'fs',
    },
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.ts$/,
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
                '@babel/preset-typescript',
              ],
              plugins: [
                '@glimmerx/babel-plugin-component-templates',
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                ['@babel/plugin-proposal-class-properties', { loose: true }],
              ],
            },
          },
        },
        {
          test: /\.(js)$/,
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
      extensions: ['.js', '.ts'],
      alias: {
        '@glimmerx/core$': require.resolve('@glimmerx/core'),
        '@glimmerx/component$': require.resolve('@glimmerx/component'),
      },
    },
  };
}
