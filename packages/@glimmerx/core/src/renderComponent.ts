import {
  renderComponent as glimmerJsRenderComponent,
  ComponentDefinition,
  RenderComponentOptions as GlimmerJsRenderComponentOptions,
} from '@glimmer/core';
import { Dict } from '@glimmer/interfaces';
import Owner from './owner';

export interface RenderComponentOptions extends GlimmerJsRenderComponentOptions {
  services?: Dict<unknown>;
}

export default function renderComponent(
  ComponentClass: ComponentDefinition,
  options: RenderComponentOptions
): Promise<void>;
export default function renderComponent(
  ComponentClass: ComponentDefinition,
  element: HTMLElement
): Promise<void>;
export default function renderComponent(
  ComponentClass: ComponentDefinition,
  optionsOrElement: RenderComponentOptions | HTMLElement
): Promise<void> {
  if (optionsOrElement instanceof Element) {
    return glimmerJsRenderComponent(ComponentClass, optionsOrElement);
  }

  const { element, args, owner: maybeOwner, services, rehydrate } = optionsOrElement;

  // service option should be removed on next "major bump"
  const owner = maybeOwner || new Owner(services ?? {});

  return glimmerJsRenderComponent(ComponentClass, {
    element,
    args,
    owner,
    rehydrate,
  });
}
