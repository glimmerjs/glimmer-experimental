import { action, on as glimmerOn } from '@glimmer/modifier';

declare const Brand: unique symbol;

// This interface provides an extension point for tools like
// Glint to augment with template-specific type information.
export interface OnModifier {
  [Brand]: 'modifier:on';
}

const on = glimmerOn as OnModifier;

export { on, action };
