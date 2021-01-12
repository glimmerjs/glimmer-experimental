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
  capabilities = helperCapabilities('3.23', {
    hasValue: true,
  });

  constructor(private owner: Owner | undefined) {}

  createHelper(fn: Helper, args: TemplateArgs) {
    const { owner } = this;

    const ownerProxy = new Proxy(
      {},
      {
        get(_target, key) {
          return owner && owner.lookup({ type: 'service', name: (key as unknown) as string });
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

  getDebugName(fn: Function) {
    return fn.name || '(anonymous function)';
  }
}

const basicHelperManagerFactory = (owner: Owner | undefined) => new BasicHelperManager(owner);

export function helper<T, U>(helperFunction: Helper<T, U>) {
  setHelperManager(basicHelperManagerFactory, helperFunction);

  return helperFunction;
}
