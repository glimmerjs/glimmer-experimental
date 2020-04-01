import {
  setHelperManager,
  HelperManager,
  helperCapabilities,
  Owner,
  TemplateArgs,
} from '@glimmerx/core';
import { Dict } from '@glimmer/interfaces';

interface HelperOptions {
  services: Dict<unknown>;
}

export type Helper<T = unknown, U = unknown> = (
  positional: T,
  named: U,
  options: HelperOptions
) => unknown;

interface BasicHelperBucket {
  fn: Helper;
  args: TemplateArgs;
  ownerProxy: Dict<unknown>;
}

class BasicHelperManager implements HelperManager<BasicHelperBucket> {
  capabilities = helperCapabilities('glimmerjs-2.0.0');

  constructor(private owner: Owner) {}

  getValue({ fn, args, ownerProxy }: BasicHelperBucket): unknown {
    return fn(args.positional, args.named, { services: ownerProxy });
  }

  createHelper(fn: Helper, args: TemplateArgs) {
    let { owner } = this;

    let ownerProxy = new Proxy(
      {},
      {
        get(_target, key) {
          return owner.lookup({ type: 'service', name: (key as unknown) as string });
        },
      }
    );

    return {
      fn,
      args,
      ownerProxy,
    };
  }
}

const basicHelperManagerFactory = (owner: Owner) => new BasicHelperManager(owner);

export function helper<T, U>(helperFunction: Helper<T, U>) {
  setHelperManager(basicHelperManagerFactory, helperFunction);

  return helperFunction;
}
