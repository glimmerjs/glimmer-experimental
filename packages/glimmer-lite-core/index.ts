import Component, { CAPABILITIES, ComponentManager } from '@glimmer/component';
import { Environment } from '@glimmer/application';
import { clientBuilder, renderJitComponent, CustomJitRuntime } from '@glimmer/runtime';
import { Option, Cursor as GlimmerCursor, Dict, Template } from '@glimmer/interfaces';
import { JitContext, templateFactory } from '@glimmer/opcode-compiler';
import CompileTimeResolver from './src/compile-time-resolver';
import RuntimeResolver from './src/runtime-resolver';
import { getComponentTemplate, setComponentTemplate } from './src/component-templates';

export { setComponentTemplate };

interface Constructor<T> {
  new(owner: unknown, args: object): T;
}

export type ComponentConstructor = Constructor<Component>;

interface RenderComponentOptions {
  element: Element;
}

export async function renderComponent(ComponentClass: Constructor<Component>, options: RenderComponentOptions): Promise<void>;
export async function renderComponent(ComponentClass: Constructor<Component>, element: HTMLElement): Promise<void>;
export async function renderComponent(ComponentClass: Constructor<Component>, optionsOrElement: RenderComponentOptions | HTMLElement): Promise<void> {
  const options: RenderComponentOptions = optionsOrElement instanceof HTMLElement ? { element: optionsOrElement } : optionsOrElement;
  const { element } = options;
  const iterator = getTemplateIterator(ComponentClass, element);
  const result = iterator.sync();
  console.log({ result });
}

export interface Cursor {
  element: Element;
  nextSibling?: Option<Node>;
}

export interface TemplateMeta {
  scope: () => Dict<unknown>;
}

// AotComponentDefinition {
//   handle: number;
//   scope: Dict<unknown>;
//   capabilities: ComponentCapabilities;
// }

// JitComponentDefinition {
//   template: TemplateJSON
//   scope: Dict<unknown>;
//   capabilities: ComponentCapabilities;
// }

let handle = 0;

export function definitionFor(ComponentClass: ComponentConstructor, manager: ComponentManager) {
  const template = getComponentTemplate(ComponentClass);

  return {
    state: {
      ComponentClass,
      template,
      handle: handle++,
      capabilities: CAPABILITIES
    },
    manager
  }
}

let manager: ComponentManager;
const templateCache = new Map<any, Template<TemplateMeta>>();
function getTemplateIterator(ComponentClass: ComponentConstructor, element: Element) {
  const env = Environment.create();
  const resolver = new RuntimeResolver();
  manager = new ComponentManager({ env });
  const context = JitContext(new CompileTimeResolver(manager, resolver));
  const runtime = CustomJitRuntime(resolver, context, env);
  const builder = clientBuilder(runtime.env, { element, nextSibling: null } as GlimmerCursor)

  manager.getJitStaticLayout = (state: any) => {
    let template = templateCache.get(state);
    if (!template) {
      template = templateFactory<TemplateMeta>(state.template).create();
      templateCache.set(state, template);
    }
    return template.asLayout();
  }

  const definition = definitionFor(ComponentClass, manager);
  resolver.register('root', definition);

  return renderJitComponent(
    runtime,
    builder,
    context,
    0,
    'root'
  );
}