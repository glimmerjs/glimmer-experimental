import { setHelperManager, capabilities } from '@ember/helper';

class BasicHelperManager {
  capabilities = capabilities('3.23', {
    hasValue: true,
  });

  constructor(owner) {
    this.owner = owner;
  }

  createHelper(fn, args) {
    const { owner } = this;

    const ownerProxy = new Proxy(
      {},
      {
        get(_target, key) {
          return owner && owner.lookup({ type: 'service', name: key });
        },
      }
    );

    return {
      fn,
      args,
      ownerProxy,
    };
  }

  getValue({ fn, args, ownerProxy }) {
    return fn(args.positional, args.named, { services: ownerProxy });
  }

  getDebugName(fn) {
    return fn.name || '(anonymous function)';
  }
}

const basicHelperManagerFactory = (owner) => new BasicHelperManager(owner);

export function helper(helperFunction) {
  setHelperManager(basicHelperManagerFactory, helperFunction);

  return helperFunction;
}
