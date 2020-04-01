import { Dict } from '@glimmer/interfaces';
import { DEBUG } from '@glimmer/env';

export interface FactoryIdentifier {
  type: 'service';
  name: string;
  namespace?: string;
}

const SERVICES = Symbol('Services');

export default class Owner {
  private [SERVICES]: Dict<unknown>;

  constructor(services: Dict<unknown>) {
    this[SERVICES] = services;
  }

  lookup({ type, name }: FactoryIdentifier) {
    if (DEBUG && type !== 'service') {
      throw new Error('The only supported lookups are for services');
    }

    if (DEBUG && this[SERVICES][name] === undefined) {
      throw new Error(`Attempted to lookup service '${name}', but it did not exist. Did you pass it into renderComponent()?`)
    }

    return this[SERVICES][name];
  }
}
