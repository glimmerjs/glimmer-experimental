import Component from '@glimmerx/component';
import { setPropertyDidChange } from '@glimmer/tracking';
import { Environment } from '@glimmer/application';
import { clientBuilder, renderJitComponent, CustomJitRuntime } from '@glimmer/runtime';
import {
  Cursor as GlimmerCursor,
  RenderResult,
} from '@glimmer/interfaces';
import { JitContext } from '@glimmer/opcode-compiler';

import CompileTimeResolver from './CompileTimeResolver';
import RuntimeResolver from './RuntimeResolver';

import { Constructor } from '../interfaces';
import { definitionForComponent } from './definitions';

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

  const definition = definitionForComponent(ComponentClass);
  resolver.register('root', definition);

  return renderJitComponent(runtime, builder, context, 0, 'root');
}
