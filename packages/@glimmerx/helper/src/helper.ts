import { setHelperManager, HelperManager, helperCapabilities, Owner } from '@glimmerx/core';
import { Arguments } from '@glimmer/interfaces';

interface HelperOptions {
  services: Record<string, unknown>;
}

export type HelperFunction<T = unknown, U = unknown> = (
  positional: T,
  named: U,
  options: HelperOptions
) => unknown;

// This type exists to provide a non-user-constructible, non-subclassable
// type representing the conceptual "instance type" of a helper.
// The abstract field of type `never` presents subclassing in userspace of
// the value returned from `helper()`.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export declare abstract class HelperInstance<S> {
  protected abstract __concrete__: never;
}

// Making `Helper` a bare constructor type allows for type parameters to be
// preserved when `helper()` is passed a generic function. By making it
// `abstract` and impossible to subclass (see above), we prevent users from
// attempting to instantiate a return value from `helper()`.
export type Helper<S> = abstract new () => HelperInstance<S>;

interface BasicHelperBucket {
  fn: HelperFunction;
  args: Arguments;
  ownerProxy: Record<string, unknown>;
}

class BasicHelperManager implements HelperManager<BasicHelperBucket> {
  capabilities = helperCapabilities('3.23', {
    hasValue: true,
  });

  constructor(private owner: Owner | undefined) {}

  createHelper(fn: HelperFunction, args: Arguments) {
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

export function helper<P extends unknown[], N, R>(
  helperFunction: (positional: P, named: N, options: HelperOptions) => R
): Helper<{ Args: { Named: N; Positional: P }; Return: R }> {
  setHelperManager(basicHelperManagerFactory, helperFunction);

  // Despite actually returning the given function, from a template's
  // perspective its associated helper manager now makes it something
  // different. It wouldn't be legal to invoke it according to its
  // original type any more, and we need to reflect that.
  return helperFunction as unknown as Helper<{
    Args: { Named: N; Positional: P };
    Return: R;
  }>;
}
