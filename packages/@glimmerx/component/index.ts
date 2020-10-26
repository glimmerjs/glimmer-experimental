import { default as Component } from '@glimmer/component';

export { default } from '@glimmer/component';
export { tracked } from '@glimmer/tracking';

export function hbs(_strings: TemplateStringsArray): Component {
  throw new Error('hbs template should have been compiled at build time');
}
