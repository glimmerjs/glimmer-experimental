import { setOwner } from '@glimmer/core';
import { Arguments, Owner } from '@glimmer/interfaces';

/**
 * A base class for modifiers which need more capabilities than function-based
 * modifiers. Useful if, for example:
 *
 * 1. You need to inject services and access them
 * 2. You need fine-grained control of updates, either for performance or
 *    convenience reasons, and don't want to teardown the state of your modifier
 *    every time only to set it up again.
 * 3. You need to store some local state within your modifier.
 *
 * The lifecycle hooks of class modifiers are tracked. When they run, they any
 * values they access will be added to the modifier, and the modifier will
 * update if any of those values change.
 */
export default class ClassModifier<Args extends Arguments = Arguments> {
  /**
   * The arguments passed to the modifier. `args.positional` is an array of
   * positional arguments, and `args.named` is an object containing the named
   * arguments.
   */
  args: Args;

  /**
   * The element the modifier is applied to.
   *
   * @warning `element` is ***not*** available during `constructor` or
   *   `willDestroy`.
   */
  // SAFETY: this is managed correctly by the class-based modifier. It is not
  // available during the `constructor`.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  element: Element = null as any;

  constructor(owner: Owner, args: Args) {
    setOwner(this, owner);
    this.args = args;
  }

  /**
   * Called when the modifier is installed **and** anytime the arguments are
   * updated.
   */
  didReceiveArguments(): void {
    /* no op, for subclassing */
  }

  /**
   * Called anytime the arguments are updated but **not** on the initial
   * install. Called before `didReceiveArguments`.
   */
  didUpdateArguments(): void {
    /* no op, for subclassing */
  }

  /**
   * Called when the modifier is installed on the DOM element. Called after
   * `didReceiveArguments`.
   */
  didInstall(): void {
    /* no op, for subclassing */
  }

  /**
   * Called when the modifier itself is about to be destroyed; use for teardown
   * code. Called after `willRemove`.
   */
  willDestroy(): void {
    /* no op, for subclassing */
  }
}
