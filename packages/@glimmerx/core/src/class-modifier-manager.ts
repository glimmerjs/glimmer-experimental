import { modifierCapabilities, ModifierManager } from '@glimmer/core';
import { Arguments, Owner } from '@glimmer/interfaces';
import ClassModifier from './class-modifier';
import { destroy, registerDestructor } from '@glimmer/destroyable';

function consumeArgs(args: Arguments) {
  for (let i = 0; i < args.positional.length; i++) {
    args.positional[i];
  }

  Object.values(args.named);
}

function destroyModifier(modifier: ClassModifier): void {
  modifier.willDestroy();
}

export default class ClassModifierManager implements ModifierManager<ClassModifier> {
  capabilities = modifierCapabilities('3.22');

  constructor(private owner: Owner) {}

  createModifier(Modifier: typeof ClassModifier, args: Arguments): ClassModifier {
    const modifier = new Modifier(this.owner, args);
    registerDestructor(modifier, destroyModifier);
    return modifier;
  }

  installModifier(instance: ClassModifier, element: Element, args: Arguments): void {
    instance.element = element;
    consumeArgs(args);
    instance.didReceiveArguments();
    instance.didInstall();
  }

  updateModifier(instance: ClassModifier, args: Arguments): void {
    instance.args = args;
    consumeArgs(args);
    instance.didUpdateArguments();
    instance.didReceiveArguments();
  }

  destroyModifier(instance: ClassModifier<Arguments>): void {
    destroy(instance);
  }
}
