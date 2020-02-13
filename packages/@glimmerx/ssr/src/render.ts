import Component from '@glimmerx/component';
import {
  RuntimeResolver,
  CompileTimeResolver,
  definitionForComponent,
  Constructor,
  dictToReference,
} from '@glimmerx/core';
import { Dict } from '@glimmer/interfaces';
import { JitContext } from '@glimmer/opcode-compiler';
import Environment from './environment';
import { CustomJitRuntime, DefaultDynamicScope, renderJitComponent } from '@glimmer/runtime';
import { StringBuilder } from '@glimmer/ssr';
import { RootReference } from '@glimmer/reference';
import createHTMLDocument from '@simple-dom/document';
import { DYNAMIC_SCOPE_SERVICES_KEY } from '@glimmerx/service';
import HTMLSerializer from '@simple-dom/serializer';
import voidMap from '@simple-dom/void-map';
import { SimpleElement } from '@simple-dom/interface';
import { PassThrough } from 'stream';

export interface RenderOptions {
  args?: Dict<unknown>;
  serializer?: HTMLSerializer;
  services?: Dict<unknown>;
}

const defaultSerializer = new HTMLSerializer(voidMap);

export function renderToString(
  ComponentClass: Constructor<Component>,
  options?: RenderOptions
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const stream = new PassThrough();
    let html = '';

    stream.on('data', str => (html += str));
    stream.on('end', () => resolve(html));
    stream.on('error', err => reject(err));

    renderToStream(stream, ComponentClass, options);
  });
}

export function renderToStream(
  stream: NodeJS.WritableStream,
  ComponentClass: Constructor<Component>,
  options: RenderOptions = {}
) {
  const element = createHTMLDocument().body;
  const iterator = getTemplateIterator(ComponentClass, element, options.args, options.services);
  iterator.sync();

  const serializer = options.serializer || defaultSerializer;

  stream.write(serializer.serializeChildren(element));
  stream.end();
}

const resolver = new RuntimeResolver();
const context = JitContext(new CompileTimeResolver(resolver));

function getTemplateIterator(
  ComponentClass: Constructor<Component>,
  element: SimpleElement,
  componentArgs?: Dict<unknown>,
  services?: Dict<unknown>
) {
  const env = Environment.create();
  const runtime = CustomJitRuntime(resolver, context, env);
  const builder = new StringBuilder({ element }).getBuilder(env);

  const definition = definitionForComponent(ComponentClass);
  resolver.register('root', definition);

  let dynamicScope;

  if (services) {
    dynamicScope = new DefaultDynamicScope({
      [DYNAMIC_SCOPE_SERVICES_KEY]: new RootReference(services),
    });
  }

  return renderJitComponent(
    runtime,
    builder,
    context,
    0,
    'root',
    dictToReference(componentArgs),
    dynamicScope
  );
}
