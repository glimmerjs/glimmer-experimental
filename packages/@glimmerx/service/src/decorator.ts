import { getService } from './setServices';

export function service(target: any, key: any): any;
export function service(target: any, key: any, descriptor: PropertyDescriptor): PropertyDescriptor;
export function service(...args: any[]): any {
  let [,key] = args;
  return {
    enumerable: true,
    configurable: false,
    get() {
      return getService(this, key);
    },
  };
}
