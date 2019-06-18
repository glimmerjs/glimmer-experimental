import { Option, CompileTimeComponent, Dict, } from '@glimmer/interfaces';
import { ComponentManager } from '@glimmer/component';
import { ResolverDelegate, templateFactory } from '@glimmer/opcode-compiler';
import { TemplateMeta, ComponentConstructor, definitionFor } from '../index';
import { getComponentTemplate } from './component-templates';
import RuntimeResolverDelegate from './runtime-resolver';

export default class CompileTimeResolver implements ResolverDelegate {
  constructor(private manager: ComponentManager, private runtimeResolver: RuntimeResolverDelegate) {}
  registry: Dict<any> = {};

  lookupHelper(_name: string, _referrer: unknown): Option<number> {
    throw new Error("Method not implemented.");
  }

  lookupModifier(_name: string, _referrer: unknown): Option<number> {
    throw new Error("Method not implemented.");
  }

  lookupComponent(name: string, referrer: TemplateMeta): Option<CompileTimeComponent> {
    const scope = referrer.scope();
    const ComponentClass = scope[name] as any as ComponentConstructor;
    const definition = definitionFor(ComponentClass, this.manager);
    const template = getComponentTemplate(ComponentClass);
    this.runtimeResolver.registry[definition.state.handle] = definition;

    console.log({ ComponentClass, definition, template });

    return {
      handle: definition.state.handle,
      capabilities: definition.state.capabilities,
      compilable: templateFactory(template!)
        .create()
        .asLayout()
    }
  }

  lookupPartial(_name: string, _referrer: unknown): Option<number> {
    throw new Error("Method not implemented.");
  }

  resolve(handle: number): unknown {
    return this.registry[handle];
  }
}