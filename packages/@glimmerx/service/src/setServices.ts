import { Dict } from '@glimmer/interfaces';

const COMPONENT_SERVICES_KEY = Symbol('COMPONENT_SERVICES_KEY');

export const DYNAMIC_SCOPE_SERVICES_KEY = '__SERVICES_KEY__';

export function getService(component: any, serviceName: string) {
  return component[COMPONENT_SERVICES_KEY] && component[COMPONENT_SERVICES_KEY][serviceName];
}

export function setServices(component: any, services: Dict<unknown>) {
  component[COMPONENT_SERVICES_KEY] = services;
}
