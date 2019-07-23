import { SerializedTemplateWithLazyBlock } from "@glimmer/interfaces";
import { Constructor, TemplateMeta } from './interfaces';
import Component from './component';

const templateMap = new WeakMap<Constructor<Component>, SerializedTemplateWithLazyBlock<TemplateMeta>>();
export function setComponentTemplate<T extends Constructor<Component>>(ComponentClass: T, template: SerializedTemplateWithLazyBlock<TemplateMeta>): T {
  templateMap.set(ComponentClass, template);  
  return ComponentClass;
}

export function getComponentTemplate(ComponentClass: Constructor<Component>) {
  return templateMap.get(ComponentClass);
}
