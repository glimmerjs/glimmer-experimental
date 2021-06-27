import { setHelperManager, HelperManager, helperCapabilities, Owner } from '@glimmerx/core';
import { Arguments } from '@glimmer/interfaces';

interface HelperOptions {
  services: Record<string, unknown>;
}

export type Helper<T = unknown, U = unknown> = (
  positional: T,
  named: U,
  options: HelperOptions
) => unknown;

interface BasicHelperBucket {
  fn: Helper;
  args: Arguments;
  ownerProxy: Record<string, unknown>;
}

class BasicHelperManager implements HelperManager<BasicHelperBucket> {
  capabilities = helperCapabilities('3.23', {
    hasValue: true,
  });

  constructor(private owner: Owner | undefined) {}

  createHelper(fn: Helper, args: Arguments) {
    const { owner } = this;

    const ownerProxy = new Proxy(
      {},
      {
        get(_target, key) {
          return owner && owner.lookup({ type: 'service', name: key as unknown as string });
        },
      }
    );

    return {
      fn,
      args,
      ownerProxy,
    };
  }

  getValue({ fn, args, ownerProxy }: BasicHelperBucket): unknown {
    return fn(args.positional, args.named, { services: ownerProxy });
  }

  getDebugName(fn: { name: string }) {
    return fn.name || '(anonymous function)';
  }
}

const basicHelperManagerFactory = (owner: Owner | undefined) => new BasicHelperManager(owner);

export function helper<T, U>(helperFunction: Helper<T, U>) {
  setHelperManager(basicHelperManagerFactory, helperFunction);

  return helperFunction;
}
