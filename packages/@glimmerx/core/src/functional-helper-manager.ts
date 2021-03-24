import { HelperManager, helperCapabilities } from '@glimmer/core';
import { Arguments } from '@glimmer/interfaces';

interface FunctionalHelperState {
  fn: (...args: unknown[]) => unknown;
  args: Arguments;
}

export default class FunctionalHelperManager implements HelperManager<FunctionalHelperState> {
  capabilities = helperCapabilities('3.23', {
    hasValue: true,
  });

  createHelper(fn: () => unknown, args: Arguments): FunctionalHelperState {
    return { fn, args };
  }

  getValue({ fn, args }: FunctionalHelperState) {
    return fn(...args.positional);
  }

  getDebugName(fn: { name?: string }) {
    return fn.name || '(anonymous function)';
  }
}
