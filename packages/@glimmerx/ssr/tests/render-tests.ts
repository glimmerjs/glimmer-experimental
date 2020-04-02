import renderTests, { Constructor } from '@glimmerx/core/tests/render-tests';
import Component from '@glimmerx/component';
import { renderToString, RenderOptions } from '..';

renderTests('@glimmer/ssr', async (component: Constructor<Component>, options: RenderOptions) => {
  return await renderToString(component, options);
});
