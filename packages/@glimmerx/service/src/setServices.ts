import { Dict } from '@glimmer/interfaces';

const COMPONENT_INSTANCE_SERVICES_MAP = new WeakMap<{}, Dict<unknown>>();

export const DYNAMIC_SCOPE_SERVICES_KEY = '__SERVICES_KEY__';

export function getService(component: any, serviceName: string) {
  const services = COMPONENT_INSTANCE_SERVICES_MAP.get(component);
  return services && services[serviceName];
}

export function setServices(component: any, services: Dict<unknown>) {
  COMPONENT_INSTANCE_SERVICES_MAP.set(component, services);
}
