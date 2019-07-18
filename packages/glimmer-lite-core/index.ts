import { Environment } from '@glimmer/application';
import { clientBuilder, renderJitComponent, CustomJitRuntime } from '@glimmer/runtime';
import {
  Option,
  Cursor as GlimmerCursor,
  Dict,
  ComponentDefinition,
  RenderResult,
} from '@glimmer/interfaces';
import { JitContext } from '@glimmer/opcode-compiler';
import CompileTimeResolver from './src/compile-time-resolver';
import RuntimeResolver from './src/runtime-resolver';
import { setComponentTemplate } from './src/component-templates';
import { getComponentManager } from './src/component-managers';

import Component from './src/component';
import { setPropertyDidChange } from '@glimmer/tracking';
export { Component };

export {
  getComponentManager,
  setComponentManager,
  LiteComponentManager,
} from './src/component-managers';
export { setComponentTemplate };

interface Constructor<T> {
  new (owner: unknown, args: object): T;
}

export type ComponentConstructor = Constructor<Component>;

interface RenderComponentOptions {
  element: Element;
}

const results: RenderResult[] = [];

export async function renderComponent(
  ComponentClass: Constructor<Component>,
  options: RenderComponentOptions
): Promise<void>;
export async function renderComponent(
  ComponentClass: Constructor<Component>,
  element: HTMLElement
): Promise<void>;
export async function renderComponent(
  ComponentClass: Constructor<Component>,
  optionsOrElement: RenderComponentOptions | HTMLElement
): Promise<void> {
  const options: RenderComponentOptions =
    optionsOrElement instanceof HTMLElement ? { element: optionsOrElement } : optionsOrElement;
  const { element } = options;
  const iterator = getTemplateIterator(ComponentClass, element);
  const result = iterator.sync();
  results.push(result);
}

setPropertyDidChange(() => {
  results.forEach(result => {
    const { env } = result;
    env.begin();
    result.rerender();
    env.commit();
  });
});

export interface Cursor {
  element: Element;
  nextSibling?: Option<Node>;
}

export interface TemplateMeta {
  scope: () => Dict<unknown>;
}

const DEFINITIONS = new WeakMap<ComponentConstructor, ComponentDefinition>();

export function definitionFor(ComponentClass: ComponentConstructor): ComponentDefinition {
  let definition = DEFINITIONS.get(ComponentClass);
  if (definition) {
    return definition;
  }

  const manager = getComponentManager(ComponentClass)!;
  definition = manager.createComponentDefinition(ComponentClass);
  DEFINITIONS.set(ComponentClass, definition);
  return definition;
}

function getTemplateIterator(ComponentClass: ComponentConstructor, element: Element) {
  const env = Environment.create();
  const resolver = new RuntimeResolver();
  const context = JitContext(new CompileTimeResolver(resolver));
  const runtime = CustomJitRuntime(resolver, context, env);
  const builder = clientBuilder(runtime.env, {
    element,
    nextSibling: null,
  } as GlimmerCursor);

  const definition = definitionFor(ComponentClass);
  resolver.register('root', definition);

  return renderJitComponent(runtime, builder, context, 0, 'root');
}
