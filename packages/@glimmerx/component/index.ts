export { default } from '@glimmer/component';
export { tracked } from '@glimmer/tracking';

export function hbs(_strings: TemplateStringsArray) {
  throw new Error('hbs template should have been compiled at build time');
}
