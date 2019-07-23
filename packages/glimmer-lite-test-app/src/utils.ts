import { precompile } from '@glimmer/compiler';
import { Dict } from '@glimmer/interfaces';

type ScopeFn = () => Dict<unknown>;

export function hbs(templateSource: string, scopeFn?: ScopeFn) {
  const template = JSON.parse(precompile(templateSource));
  template.meta.scope = scopeFn;
  return template;
}