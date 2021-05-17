declare const Babel: any;

import glimmerXPreset from '@glimmerx/babel-preset';
import { precompile } from '@glimmer/compiler';
import babelPresetEnv from '@babel/preset-env';

export default function compile(js: string): { code: string } {
  return Babel.transform(js, {
    filename: 'main.ts',
    presets: [
      [glimmerXPreset, { __loadPlugins: true, precompile }],
      [
        babelPresetEnv,
        {
          targets: [
            'last 2 Edge versions',
            'last 2 Chrome versions',
            'last 2 Firefox versions',
            'last 2 Safari versions',
          ],
        },
      ],
    ],
  });
}
