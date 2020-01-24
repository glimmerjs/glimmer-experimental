import { document } from 'global';
import { RenderMainArgs } from './types';
import { renderComponent } from '@glimmerx/core';

const rootElement = document ? document.getElementById('root') : null;

/**
 * Renders the components
 * @param {function} storyFn - The function to get the Glimmer Component.
 * @param {function} showMain - The function to initialize Storybook elements.
 */
export default function renderMain({ storyFn, showMain }: RenderMainArgs) {
  const glimmerStoryComponent: any = storyFn();
  rootElement.innerHTML = '';
  showMain();
  return renderComponent(glimmerStoryComponent, { element: rootElement });
}
