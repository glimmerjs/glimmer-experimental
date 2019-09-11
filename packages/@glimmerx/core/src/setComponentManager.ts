import { ComponentManager } from '@glimmer/interfaces';

const COMPONENT_MANAGER_MAP = new WeakMap<{}, ComponentManager>();

export function setComponentManager(obj: {}, manager: ComponentManager) {
  COMPONENT_MANAGER_MAP.set(obj, manager);
}

export function getComponentManager(obj: {}): ComponentManager | null {
  let target = obj;

  while (target !== null) {
    let manager = COMPONENT_MANAGER_MAP.get(target);
    if (manager) {
      return manager;
    }
    target = Object.getPrototypeOf(target);
  }

  return null;
}
