import Component from '@glimmerx/component';
import { Option, CompileTimeComponent, Dict, Helper as GlimmerHelper } from '@glimmer/interfaces';
import { ResolverDelegate, templateFactory } from '@glimmer/opcode-compiler';

import RuntimeResolverDelegate from './RuntimeResolver';
import { TemplateMeta, Constructor } from '../interfaces';
import { definitionForComponent, definitionForHelper } from './definitions';

export default class CompileTimeResolver implements ResolverDelegate {
  constructor(private runtimeResolver: RuntimeResolverDelegate) {}
  registry: Dict<any> = {};

  lookupHelper(name: string, referrer: TemplateMeta): Option<number> {
    const scope = referrer.scope();
    const Helper = scope[name] as any as GlimmerHelper;
    const { state } = definitionForHelper(Helper);
    const { fn, handle } = state;

    this.runtimeResolver.registry[handle] = fn;
    return handle;
  }

  lookupModifier(_name: string, _referrer: unknown): Option<number> {
    throw new Error("Method not implemented.");
  }

  lookupComponent(name: string, referrer: TemplateMeta): Option<CompileTimeComponent> {
    const scope = referrer.scope();
    const ComponentClass = scope[name] as any as Constructor<Component>;
    const definition = definitionForComponent(ComponentClass) as any;
    const { state } = definition;
    const { template, handle, capabilities } = state;

    this.runtimeResolver.registry[handle] = definition;

    return {
      handle,
      capabilities,
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
