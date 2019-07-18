import Component from '@glimmer/component';
import { precompile } from '@glimmer/compiler';
import { Dict } from '@glimmer/interfaces';
import { setComponentTemplate } from '..';

type ScopeFn = () => Dict<unknown>;

export interface Constructor<T> {
  new(owner: unknown, args: object): T;
}

export function hbs(templateSource: string, scopeFn?: ScopeFn) {
  const template = JSON.parse(precompile(templateSource));
  template.meta.scope = scopeFn;
  return template;
}

export function withTemplate(ComponentClass: Constructor<Component>, templateSource: string, scope: ScopeFn) {
  setComponentTemplate(ComponentClass, hbs(templateSource, scope));
  (ComponentClass as any).template = hbs(templateSource, scope);
  return ComponentClass;
}
