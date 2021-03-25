import { modifierCapabilities, ModifierManager } from '@glimmer/core';
import { Arguments } from '@glimmer/interfaces';

type SimpleModifierFn = (...args: unknown[]) => (() => void) | undefined;

interface FunctionalModifierState {
  fn: SimpleModifierFn;
  args: Arguments;
  element: Element | undefined;
  destructor: (() => void) | undefined;
}

export default class FunctionalModifierManager implements ModifierManager<FunctionalModifierState> {
  capabilities = modifierCapabilities('3.22');

  createModifier(fn: SimpleModifierFn, args: Arguments): FunctionalModifierState {
    return { fn, args, element: undefined, destructor: undefined };
  }

  installModifier(state: FunctionalModifierState, element: Element) {
    state.element = element;
    this.setupModifier(state);
  }

  updateModifier(state: FunctionalModifierState) {
    this.destroyModifier(state);
    this.setupModifier(state);
  }

  destroyModifier(state: FunctionalModifierState) {
    if (typeof state.destructor === 'function') {
      state.destructor();
    }
  }

  setupModifier(state: FunctionalModifierState) {
    const { fn, args, element } = state;
    state.destructor = fn(element, ...args.positional, args.named);
  }
}
