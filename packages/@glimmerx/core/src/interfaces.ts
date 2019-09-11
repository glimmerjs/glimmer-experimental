import { Dict } from '@glimmer/interfaces';

export interface Constructor<T> {
  new (owner: unknown, args: object): T;
}

export interface TemplateMeta {
  scope: () => Dict<unknown>;
}
