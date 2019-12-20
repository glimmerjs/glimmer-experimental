// eslint-disable-next-line import/no-extraneous-dependencies
import { Configuration } from 'webpack';

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
        '@glimmerx/core$': require.resolve('@glimmerx/core'),
        '@glimmerx/component$': require.resolve('@glimmerx/component'),
      },
    },
  };
}
