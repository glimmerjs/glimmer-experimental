import Component from '@glimmerx/component';
import { setPropertyDidChange } from '@glimmer/tracking';
import { Environment } from '@glimmer/application';
import {
  clientBuilder,
  renderJitComponent,
  CustomJitRuntime,
  DefaultDynamicScope,
} from '@glimmer/runtime';
import { Cursor as GlimmerCursor, RenderResult, Dict } from '@glimmer/interfaces';
import { JitContext } from '@glimmer/opcode-compiler';

import CompileTimeResolver from './CompileTimeResolver';
import RuntimeResolver from './RuntimeResolver';

import { Constructor } from '../interfaces';
import { definitionForComponent } from './definitions';
import { DYNAMIC_SCOPE_SERVICES_KEY } from '@glimmerx/service';
import { RootReference } from '@glimmer/reference';

export interface RenderComponentOptions {
  element: Element;
  services?: Dict<unknown>;
  reRendered?: () => void;
}

const reRenderNotifiers: Array<() => void> = [];

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
  const { element, services } = options;
  const iterator = getTemplateIterator(ComponentClass, element, services);
  const result = iterator.sync();
  results.push(result);

  if (options.reRendered) {
    reRenderNotifiers.push(options.reRendered);
  }
}

export default renderComponent;

const results: RenderResult[] = [];

setPropertyDidChange(scheduleRevalidation);

let scheduled = false;
function scheduleRevalidation() {
  if (scheduled) {
    return;
  }

  scheduled = true;
  setTimeout(() => {
    scheduled = false;
    revalidate();

    reRenderNotifiers.forEach((notifier) => notifier());
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

const resolver = new RuntimeResolver();
const context = JitContext(new CompileTimeResolver(resolver));

function getTemplateIterator(
  ComponentClass: Constructor<Component>,
  element: Element,
  services?: Dict<unknown>
) {
  const env = Environment.create();
  const runtime = CustomJitRuntime(resolver, context, env);
  const builder = clientBuilder(runtime.env, {
    element,
    nextSibling: null,
  } as GlimmerCursor);

  const definition = definitionForComponent(ComponentClass);
  resolver.register('root', definition);

  let dynamicScope;

  if (services) {
    dynamicScope = new DefaultDynamicScope({
      [DYNAMIC_SCOPE_SERVICES_KEY]: new RootReference(services),
    });
  }

  return renderJitComponent(runtime, builder, context, 0, 'root', undefined, dynamicScope);
}
