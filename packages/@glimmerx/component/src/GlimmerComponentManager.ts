import { Template, Environment, VMArguments, DynamicScope, Dict } from "@glimmer/interfaces";
import { VersionedPathReference } from "@glimmer/reference";
import { ComponentManager, TemplateMeta } from "@glimmer/component";
import { templateFactory } from "@glimmer/opcode-compiler";
import { DYNAMIC_SCOPE_SERVICES_KEY, setServices } from "@glimmerx/service";

const templateCache = new WeakMap<any, Template<TemplateMeta>>();

const env: any = {
  getOwner() { return null; },
  setOwner() { return null; }
}

export default class GlimmerComponentManager extends ComponentManager {
  constructor() {
    super({ env });
  }

  create(
    _env: Environment,
    definition: any,
    args: VMArguments,
    dynamicScope: DynamicScope,
    _caller: VersionedPathReference<unknown>,
    _hasDefaultBlock: boolean
  ): any {
    // Casted to any since glimmer/component does not export the different return types
    const componentState = super.create(_env, definition, args, dynamicScope, _caller, _hasDefaultBlock) as any;
    const services = dynamicScope.get(DYNAMIC_SCOPE_SERVICES_KEY);
    if (componentState && componentState.component && services) {
      setServices(componentState.component, services.value() as Dict<unknown>)
    }
    return componentState;
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
