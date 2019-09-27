import Component from '@glimmerx/component';
import { RuntimeResolver, CompileTimeResolver, definitionForComponent, Constructor } from '@glimmerx/core';
import { Dict } from '@glimmer/interfaces';
import { JitContext } from '@glimmer/opcode-compiler';
import Environment from './environment';
import { CustomJitRuntime, DefaultDynamicScope, renderJitComponent } from '@glimmer/runtime';
import { StringBuilder } from '@glimmer/ssr';
import { RootReference, PathReference } from '@glimmer/reference';
import createHTMLDocument from '@simple-dom/document';
import { DYNAMIC_SCOPE_SERVICES_KEY } from '@glimmerx/service';
import HTMLSerializer from '@simple-dom/serializer';
import voidMap from '@simple-dom/void-map';
import { SimpleElement } from '@simple-dom/interface';
import { PassThrough } from 'stream';

export interface RenderOptions {
  data?: Dict<unknown>;
  services?: Dict<unknown>;
};

const serializer = new HTMLSerializer(voidMap);

function dictToReference(dict?: Dict<unknown>): Dict<PathReference> {
  if (!dict) {
    return {};
  }

  return Object.keys(dict).reduce((acc, key) => {
    acc[key] = new RootReference(dict[key]);
    return acc;
  }, {} as Dict<PathReference>);
}

export function renderToString(ComponentClass: Constructor<Component>, options?: RenderOptions): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const stream = new PassThrough();
    let html = '';

    stream.on('data', str => (html += str));
    stream.on('end', () => resolve(html));
    stream.on('error', err => reject(err));

    renderToStream(stream, ComponentClass, options);
  });
}

export function renderToStream(stream: NodeJS.WritableStream, ComponentClass: Constructor<Component>, options: RenderOptions = {}) {
  const element = createHTMLDocument().body;
  const iterator = getTemplateIterator(ComponentClass, element, options.data, options.services);
  iterator.sync();

  stream.write(serializer.serializeChildren(element));
  stream.end();
}


const resolver = new RuntimeResolver();
const context = JitContext(new CompileTimeResolver(resolver));

function getTemplateIterator(ComponentClass: Constructor<Component>, element: SimpleElement, componentArgs?: Dict<unknown>, services?: Dict<unknown>) {
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

  return renderJitComponent(runtime, builder, context, 0, 'root', dictToReference(componentArgs), dynamicScope);
}
