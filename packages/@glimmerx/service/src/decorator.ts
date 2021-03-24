import { Owner, getOwner } from '@glimmerx/core';
import { assert } from '@glimmer/debug';

function makeServiceDecorator(
  name: string
): (object: object, key: string | symbol) => PropertyDescriptor {
  return () => ({
    enumerable: true,
    configurable: false,
    get() {
      const owner = getOwner<Owner>(this);

      assert(
        owner,
        `Attempted to lookup the ${name} service on an instance of ${this}, but there was no owner set on that object`
      );

      return owner.lookup({ type: 'service', name });
    },
  });
}

export function service(serviceName: string): PropertyDecorator;
export function service(target: object, key: string | symbol): void;
export function service(
  target: object,
  key: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor;

export function service(
  targetOrServiceName: object | string,
  key?: string | symbol
): PropertyDescriptor | PropertyDecorator {
  if (typeof targetOrServiceName === 'string') {
    return makeServiceDecorator(targetOrServiceName);
  }

  return makeServiceDecorator((key as unknown) as string)(targetOrServiceName, key!);
}
