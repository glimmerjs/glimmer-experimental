import { ComponentDefinition, Template } from "@glimmer/interfaces";
import { ComponentManager as GlimmerComponentManager, CAPABILITIES, TemplateMeta } from "@glimmer/component";
import { templateFactory } from "@glimmer/opcode-compiler";

let handle = 0;
const templateCache = new Map<any, Template<TemplateMeta>>();

const env: any = {
  getOwner() { return null; },
  setOwner() { return null; }
}

export class LiteComponentManager extends GlimmerComponentManager implements WithComponentDefinitionFactory {
  constructor() {
    super({ env });
  }

  createComponentDefinition(ComponentClass: any): ComponentDefinition {
    const { template } = ComponentClass;

    return {
      state: {
        ComponentClass,
        template,
        handle: handle++,
        capabilities: CAPABILITIES
      },
      manager: this
    };
  }

  getJitStaticLayout(state: any) {
    let template = templateCache.get(state);
    if (!template) {
      template = templateFactory<TemplateMeta>(state.template).create();
      templateCache.set(state, template);
    }
    return template.asLayout();
  };
}

interface WithComponentDefinitionFactory<T = any> {
  createComponentDefinition(component: T): ComponentDefinition;
}

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
