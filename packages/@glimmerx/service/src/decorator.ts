import { Owner, getOwner } from '@glimmerx/core';

function makeServiceDecorator(
  name: string
): (object: object, key: string | symbol) => PropertyDescriptor {
  return () => ({
    enumerable: true,
    configurable: false,
    get() {
      return getOwner<Owner>(this).lookup({ type: 'service', name });
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
