import { document } from 'global';
import { RenderMainArgs, GlimmerStoryFnReturnType, GlimmerStoryComponentClass } from './types';
import { renderComponent, RenderComponentOptions } from '@glimmerx/core';

const rootElement = document ? document.getElementById('root') : null;

/**
 * Renders the components
 * @param {function} storyFn - The function to get the Glimmer Component.
 * @param {function} showMain - The function to initialize Storybook elements.
 */
export default function renderMain({ storyFn, showMain }: RenderMainArgs) {
  const storyFnResult: GlimmerStoryFnReturnType = storyFn();
  let glimmerStoryComponent: GlimmerStoryComponentClass;
  let glimmerRenderComponentOptions: RenderComponentOptions = {
    element: rootElement,
  };

  if ('componentClass' in storyFnResult && 'renderOptions' in storyFnResult) {
    glimmerStoryComponent = storyFnResult.componentClass;
    glimmerRenderComponentOptions = {
      ...glimmerRenderComponentOptions,
      ...storyFnResult.renderOptions,
    };
  } else {
    glimmerStoryComponent = storyFnResult;
  }

  /**
   * Fix an issue with template tag where the actual element is inserted as a sibling instead of being a child of #document-fragment
   * Wrap this inside of window.onload for the iframe to finish
   */
  window.addEventListener('load', () => {
    rootElement.querySelectorAll('template').forEach((element: HTMLTemplateElement) => {
      const { firstElementChild } = element;
      if (firstElementChild) {
        element.content.append(firstElementChild);
      }
    });
  });

  rootElement.innerHTML = '';
  showMain();
  return renderComponent(glimmerStoryComponent, glimmerRenderComponentOptions);
}
