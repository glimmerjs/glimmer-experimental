import { CAPABILITIES } from './capabilities';
import Component from '@glimmerx/component';
import { ComponentDefinition, Helper as GlimmerHelper, ModifierManager } from '@glimmer/interfaces';

import { getComponentManager } from '../setComponentManager';
import { getComponentTemplate } from '../setComponentTemplate';
import { Constructor } from '../interfaces';

interface HelperDefinition {
  state: {
    fn: GlimmerHelper;
    handle: number;
  };
}

export interface Modifier {
  state: any;
  manager: ModifierManager;
}

const COMPONENT_DEFINITIONS = new WeakMap<Constructor<Component>, ComponentDefinition>();
const HELPER_DEFINITIONS = new WeakMap<GlimmerHelper, HelperDefinition>();
const MODIFIER_HANDLES = new WeakMap<Modifier, number>();

export function definitionForComponent(
  ComponentClass: Constructor<Component>
): ComponentDefinition {
  return COMPONENT_DEFINITIONS.get(ComponentClass) || createComponentDefinition(ComponentClass);
}

export function definitionForHelper(Helper: GlimmerHelper): HelperDefinition {
  return HELPER_DEFINITIONS.get(Helper) || createHelperDefinition(Helper);
}

let HANDLE = 0;

export function handleForModifier(modifier: Modifier) {
  let handle = MODIFIER_HANDLES.get(modifier);

  if (!handle) {
    handle = HANDLE++;
    MODIFIER_HANDLES.set(modifier, handle);
  }

  return handle;
}

function createComponentDefinition(ComponentClass: Constructor<Component>): ComponentDefinition {
  const manager = getComponentManager(ComponentClass)!;
  const template = getComponentTemplate(ComponentClass);

  const definition = {
    state: {
      ComponentClass,
      template,
      handle: HANDLE++,
      capabilities: CAPABILITIES,
    },
    manager,
  };

  COMPONENT_DEFINITIONS.set(ComponentClass, definition);

  return definition;
}

function createHelperDefinition(Helper: GlimmerHelper): HelperDefinition {
  const definition = {
    state: {
      fn: Helper,
      handle: HANDLE++,
    },
  };

  HELPER_DEFINITIONS.set(Helper, definition);
  return definition;
}
