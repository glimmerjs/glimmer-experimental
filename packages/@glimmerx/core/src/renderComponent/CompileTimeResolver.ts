import Component from '@glimmerx/component';
import { Option, CompileTimeComponent, Dict, Helper as GlimmerHelper } from '@glimmer/interfaces';
import { ResolverDelegate, templateFactory } from '@glimmer/opcode-compiler';

import RuntimeResolverDelegate from './RuntimeResolver';
import { TemplateMeta, Constructor } from '../interfaces';
import { definitionForComponent, definitionForHelper, Modifier, handleForModifier } from './definitions';

export default class CompileTimeResolver implements ResolverDelegate {
  constructor(private runtimeResolver: RuntimeResolverDelegate) {}
  registry: Dict<any> = {};

  lookupHelper(name: string, referrer: TemplateMeta): Option<number> {
    const scope = referrer.scope();
    const Helper = (scope[name] as any) as GlimmerHelper;
    const { state } = definitionForHelper(Helper);
    const { fn, handle } = state;

    this.runtimeResolver.registry[handle] = fn;
    return handle;
  }

  lookupModifier(name: string, referrer: TemplateMeta): Option<number> {
    const scope = referrer.scope();
    const modifier = (scope[name] as any) as Modifier;
    if (!modifier) {
      throw new Error(`Cannot find modifier ${name} in scope`);
    }

    const handle = handleForModifier(modifier);
    this.runtimeResolver.registry[handle] = modifier;
    return handle;
  }

  lookupComponent(name: string, referrer: TemplateMeta): Option<CompileTimeComponent> {
    const scope = referrer.scope();
    const ComponentClass = (scope[name] as any) as Constructor<Component>;
    const definition = definitionForComponent(ComponentClass) as any;
    const { state } = definition;
    const { template, handle, capabilities } = state;

    this.runtimeResolver.registry[handle] = definition;

    return {
      handle,
      capabilities,
      compilable: templateFactory(template!)
        .create()
        .asLayout(),
    };
  }

  lookupPartial(_name: string, _referrer: unknown): Option<number> {
    throw new Error('Method not implemented.');
  }

  resolve(handle: number): unknown {
    return this.registry[handle];
  }
}
