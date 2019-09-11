import {
  ResolvedValue,
  ComponentDefinition,
  RuntimeResolverDelegate,
  Template,
  Option,
  Dict,
} from '@glimmer/interfaces';

export default class implements RuntimeResolverDelegate {
  registry: Dict<any> = {};

  register(name: string, component: any) {
    this.registry[name] = component;
  }
  compilable(_locator: any): Template<unknown> {
    throw new Error('Method not implemented.');
  }
  lookupComponent(name: string, _referrer?: unknown): Option<ComponentDefinition> {
    return this.registry[name];
  }
  lookupPartial(_name: string, _referrer?: unknown): Option<number> {
    throw new Error('Method not implemented.');
  }
  resolve<U extends ResolvedValue>(handle: number): U {
    return this.registry[handle];
  }
}
