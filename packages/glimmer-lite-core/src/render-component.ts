import { setPropertyDidChange } from '@glimmer/tracking';
import { Environment } from '@glimmer/application';
import { clientBuilder, renderJitComponent, CustomJitRuntime } from '@glimmer/runtime';
import {
  Cursor as GlimmerCursor,
  RenderResult,
  ComponentDefinition
} from '@glimmer/interfaces';
import { JitContext } from '@glimmer/opcode-compiler';

import CompileTimeResolver from './compile-time-resolver';
import RuntimeResolver from './runtime-resolver';

import Component from './component';
import { getComponentManager } from './component-managers';
import { Constructor } from './interfaces';

interface RenderComponentOptions {
  element: Element;
}

async function renderComponent(
  ComponentClass: Constructor<Component>,
  options: RenderComponentOptions
): Promise<void>;
async function renderComponent(
  ComponentClass: Constructor<Component>,
  element: HTMLElement
): Promise<void>;
async function renderComponent(
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

export default renderComponent;

const results: RenderResult[] = [];

setPropertyDidChange(scheduleRevalidation);

let scheduled = false;
function scheduleRevalidation() {
  if (scheduled) { return; }

  scheduled = true;
  setTimeout(() => {
    scheduled = false;
    revalidate();
  }, 0);
}

function revalidate() {
  for (let result of results) {
    const { env } = result;
    env.begin();
    result.rerender();
    env.commit();
  }
}

function getTemplateIterator(ComponentClass: Constructor<Component>, element: Element) {
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

const DEFINITIONS = new WeakMap<Constructor<Component>, ComponentDefinition>();

export function definitionFor(ComponentClass: Constructor<Component>): ComponentDefinition {
  let definition = DEFINITIONS.get(ComponentClass);
  if (definition) {
    return definition;
  }

  const manager = getComponentManager(ComponentClass)!;
  definition = manager.createComponentDefinition(ComponentClass);
  DEFINITIONS.set(ComponentClass, definition);
  return definition;
}