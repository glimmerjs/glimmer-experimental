import { ComponentConstructor, TemplateMeta } from "../index";
import { SerializedTemplateWithLazyBlock } from "@glimmer/interfaces";

const templateMap = new WeakMap<ComponentConstructor, SerializedTemplateWithLazyBlock<TemplateMeta>>();
export function setComponentTemplate<T extends ComponentConstructor>(ComponentClass: T, template: SerializedTemplateWithLazyBlock<TemplateMeta>): T {
  templateMap.set(ComponentClass, template);  
  return ComponentClass;
}

export function getComponentTemplate(ComponentClass: ComponentConstructor) {
  return templateMap.get(ComponentClass);
}
