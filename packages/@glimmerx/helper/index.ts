export { helper, HelperFunction, Helper } from './src/helper';

import { fn as glimmerFn } from '@glimmer/helper';

declare const Brand: unique symbol;

// This interface provides an extension point for tools like
// Glint to augment with template-specific type information.
export interface FnHelper {
  [Brand]: 'helper:fn';
}

export const fn = glimmerFn as FnHelper;
