import Component from '@glimmer/component';
import { precompile } from '@glimmer/compiler';
import { Dict } from '@glimmer/interfaces';
import { setComponentTemplate } from 'glimmer-lite-core';

type ScopeFn = () => Dict<unknown>;

export interface Constructor<T> {
  new(owner: unknown, args: object): T;
}

function compileWithScope(templateSource: string, scopeFn: ScopeFn) {
  const template = JSON.parse(precompile(templateSource));
  template.meta.scope = scopeFn;
  return template;
}

export function withTemplate(ComponentClass: Constructor<Component>, templateSource: string, scope: ScopeFn) {
  setComponentTemplate(ComponentClass, compileWithScope(templateSource, scope));
  (ComponentClass as any).template = compileWithScope(templateSource, scope);
  return ComponentClass;
}
