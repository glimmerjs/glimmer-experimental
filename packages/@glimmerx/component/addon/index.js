export { default } from '@glimmer/component';
export { tracked } from '@glimmer/tracking';

export function hbs() {
  throw new Error('hbs template should have been compiled at build time');
}
