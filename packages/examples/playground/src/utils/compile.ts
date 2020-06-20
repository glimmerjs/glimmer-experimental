declare const Babel;

import glimmerEnvPlugin from '@glimmer/babel-plugin-glimmer-env';
import componentTemplatesPlugin from '@glimmerx/babel-plugin-component-templates';

Babel.registerPlugin('@glimmer/babel-plugin-glimmer-env', glimmerEnvPlugin);
Babel.registerPlugin('@glimmerx/babel-plugin-component-templates', componentTemplatesPlugin);

export default function compile(js: string): { code: string } {
  return Babel.transform(js, {
    filename: 'main.ts',
    plugins: [
      ['@glimmer/babel-plugin-glimmer-env', { DEBUG: true }],
      '@glimmerx/babel-plugin-component-templates',
    ],
    presets: [
      [
        'env',
        {
          targets: [
            'last 2 Edge versions',
            'last 2 Chrome versions',
            'last 2 Firefox versions',
            'last 2 Safari versions',
          ],
        },
      ],
      ['stage-2', { decoratorsLegacy: true }],
      'typescript',
    ],
  });
}
