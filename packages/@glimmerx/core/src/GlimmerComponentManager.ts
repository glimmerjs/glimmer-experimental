import { Template } from "@glimmer/interfaces";
import { ComponentManager, TemplateMeta } from "@glimmer/component";
import { templateFactory } from "@glimmer/opcode-compiler";

const templateCache = new WeakMap<any, Template<TemplateMeta>>();

const env: any = {
  getOwner() { return null; },
  setOwner() { return null; }
}

export default class GlimmerComponentManager extends ComponentManager {
  constructor() {
    super({ env });
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