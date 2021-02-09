import {
  renderToString as glimmerJsRenderToString,
  renderToStream as glimmerJsRenderToStream,
  RenderOptions as GlimmerJsRenderOptions,
} from '@glimmer/ssr';
import { Dict } from '@glimmer/interfaces';
import { ComponentDefinition, Owner } from '@glimmerx/core';

export interface RenderOptions extends GlimmerJsRenderOptions {
  services?: Dict<unknown>;
}

export function renderToString(
  definition: ComponentDefinition,
  { args, serializer, owner: maybeOwner, services, rehydrate }: RenderOptions = {}
): Promise<string> {
  const owner = maybeOwner instanceof Owner ? maybeOwner : new Owner(services ?? {});

  return glimmerJsRenderToString(definition, { args, serializer, owner, rehydrate });
}

export function renderToStream(
  stream: NodeJS.WritableStream,
  definition: ComponentDefinition,
  { args, serializer, owner: maybeOwner, services, rehydrate }: RenderOptions = {}
): void {
  const owner = maybeOwner instanceof Owner ? maybeOwner : new Owner(services ?? {});

  glimmerJsRenderToStream(stream, definition, { args, serializer, owner, rehydrate });
}
