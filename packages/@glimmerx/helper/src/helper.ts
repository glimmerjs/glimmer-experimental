import { Helper as GlimmerHelper, Dict } from '@glimmer/interfaces';
import HelperReference, { UserHelper } from './reference';
import { DYNAMIC_SCOPE_SERVICES_KEY, service } from '@glimmerx/service';
import { Reference } from '@glimmer/reference';

export function helper(helperFn: UserHelper): GlimmerHelper {
  return (args, vm) => {
    const dynamicScope = vm.dynamicScope();
    let services;

    if (dynamicScope) {
      services = dynamicScope.get(DYNAMIC_SCOPE_SERVICES_KEY) as Reference<Dict<unknown>>;
    }

    return new HelperReference(helperFn, args, services);
  };
}
