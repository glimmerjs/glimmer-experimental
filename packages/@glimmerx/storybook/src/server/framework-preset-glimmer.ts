import { Configuration } from 'webpack';

export function webpack(config: Configuration) {
  const configRules = (config.module && config.module.rules) || [];
  return {
    ...config,
    externals: {
      fs: 'fs',
    },
    module: {
      ...config.module,
      rules: [
        ...configRules,
        {
          test: /\.(ts|gts)$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@glimmerx/babel-preset',
                  [
                    '@babel/preset-env',
                    {
                      modules: false,
                    },
                  ],
                  '@babel/preset-typescript',
                ],
              },
            },
            '@glimmerx/webpack-loader',
          ],
        },
        {
          test: /\.(js|gjs)$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@glimmerx/babel-preset',
                  [
                    '@babel/preset-env',
                    {
                      modules: false,
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
    resolve: {
      plugins: [],
      extensions: ['.js', '.ts', '.gjs', '.gts'],
      alias: {
        '@glimmerx/core$': require.resolve('@glimmerx/core'),
        '@glimmerx/component$': require.resolve('@glimmerx/component'),
      },
    },
  };
}
