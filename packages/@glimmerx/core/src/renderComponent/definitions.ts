import { ComponentDefinition } from '@glimmer/interfaces';
import { CAPABILITIES } from '@glimmer/component';
import Component from '@glimmerx/component';

import { getComponentManager } from '../setComponentManager';
import { getComponentTemplate } from '../setComponentTemplate';
import { Constructor } from '../interfaces';

const DEFINITIONS = new WeakMap<Constructor<Component>, ComponentDefinition>();

export function definitionFor(ComponentClass: Constructor<Component>): ComponentDefinition {
  return DEFINITIONS.get(ComponentClass) || createDefinition(ComponentClass);
}

let HANDLE = 0;

function createDefinition(ComponentClass: Constructor<Component>): ComponentDefinition {
  const manager = getComponentManager(ComponentClass)!;
  const template = getComponentTemplate(ComponentClass);

  const definition = {
    state: {
      ComponentClass,
      template,
      handle: HANDLE++,
      capabilities: CAPABILITIES
    },
    manager
  };

  DEFINITIONS.set(ComponentClass, definition);

  return definition;
}