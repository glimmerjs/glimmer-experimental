import { Dict } from '@glimmer/interfaces';
import { FactoryIdentifier, Owner } from '@glimmerx/core';

const SERVICES = Symbol('Services');

// Extending owner but we don't really use anything from base class.
export default class LazyOwner extends Owner {
  private [SERVICES]: Dict<unknown>;
  private delegate;

  constructor(delegate: Dict<unknown>) {
    super({}); // This is a hack, because we don't want to use the parent classes services.
    this[SERVICES] = {};
    this.delegate = delegate;
  }

  lookup({ type, name }: FactoryIdentifier) {
    if (type !== 'service') {
      throw new Error('The only supported lookups are for services');
    }

    if (this[SERVICES][name]) {
      return this[SERVICES][name];
    }

    if (this[SERVICES][name] === undefined) {
      if (!this.delegate[name]) {
        throw new Error(
          `Unable to lookup service '${name}', but it did not exist. Did you pass it to the render method.`
        );
      }
      const ServiceClassRef = this.delegate[name];

      this[SERVICES][name] = new ServiceClassRef(this);
    }

    return this[SERVICES][name];
  }
}
