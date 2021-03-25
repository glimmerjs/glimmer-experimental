import { Dict } from '@glimmer/interfaces';
import { DEBUG } from '@glimmer/env';

export interface FactoryIdentifier {
  type: 'service';
  name: string;
  namespace?: string;
}

const SERVICES_CACHE = Symbol('Services');

function isConstructor(func: unknown): func is { new (owner: Owner): unknown } {
  return (
    (func && typeof func === 'function' && func.prototype && func.prototype.constructor) === func
  );
}

export default class Owner {
  private [SERVICES_CACHE]: Map<string, unknown>;
  private services;

  constructor(services: Dict<unknown>) {
    this[SERVICES_CACHE] = new Map<string, unknown>();
    this.services = services;
  }

  lookup({ type, name }: FactoryIdentifier) {
    if (DEBUG && type !== 'service') {
      throw new Error('The only supported lookups are for services');
    }

    if (DEBUG && this.services[name] === undefined) {
      throw new Error(
        `Attempted to lookup service '${name}', but it did not exist. Did you pass it into renderComponent()?`
      );
    }

    // If the service `name` does not exist in the cache
    if (!this[SERVICES_CACHE].has(name) && this.services[name]) {
      const maybeConstructor = this.services[name];

      const someService = isConstructor(maybeConstructor)
        ? new maybeConstructor(this)
        : maybeConstructor;

      this[SERVICES_CACHE].set(name, someService);
    }

    return this[SERVICES_CACHE].get(name);
  }
}
