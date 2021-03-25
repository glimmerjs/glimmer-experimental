import {
  renderToString as glimmerJsRenderToString,
  renderToStream as glimmerJsRenderToStream,
  RenderOptions as GlimmerJsRenderOptions,
} from '@glimmer/ssr';
import { Dict } from '@glimmer/interfaces';
import { ComponentDefinition, Owner } from '@glimmerx/core';

export interface RenderOptions extends Omit<GlimmerJsRenderOptions, 'owner'> {
  services?: Dict<unknown>;
}

export function renderToString(
  definition: ComponentDefinition,
  { args, serializer, services, rehydrate }: RenderOptions = {}
): Promise<string> {
  const owner = new Owner(services || {});

  return glimmerJsRenderToString(definition, { args, serializer, owner, rehydrate });
}

export function renderToStream(
  stream: NodeJS.WritableStream,
  definition: ComponentDefinition,
  { args, serializer, services, rehydrate }: RenderOptions = {}
): void {
  const owner = new Owner(services || {});

  glimmerJsRenderToStream(stream, definition, { args, serializer, owner, rehydrate });
}
