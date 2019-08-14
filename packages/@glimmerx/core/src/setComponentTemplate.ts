import { SerializedTemplateWithLazyBlock } from "@glimmer/interfaces";
import { TemplateMeta } from './interfaces';

const TEMPLATE_MAP = new WeakMap<object, SerializedTemplateWithLazyBlock<TemplateMeta>>();

export function setComponentTemplate<T extends object>(ComponentClass: T, template: SerializedTemplateWithLazyBlock<TemplateMeta>): T {
  TEMPLATE_MAP.set(ComponentClass, template);  
  return ComponentClass;
}

export function getComponentTemplate<T extends object>(ComponentClass: T) {
  return TEMPLATE_MAP.get(ComponentClass);
}
