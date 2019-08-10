import LiteComponentManager from './lite-component-manager';

const COMPONENT_MANAGER_MAP = new WeakMap<{}, LiteComponentManager>();

export function setComponentManager(obj: {}, manager: LiteComponentManager) {
  COMPONENT_MANAGER_MAP.set(obj, manager);
}

export function getComponentManager(obj: {}): LiteComponentManager | null {
  let target = obj;

  while (target !== null) {
    let manager = COMPONENT_MANAGER_MAP.get(target)
    if (manager) { return manager; }
    target = Object.getPrototypeOf(target);
  }

  return null;
}
