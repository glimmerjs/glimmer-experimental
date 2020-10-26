import { renderComponent } from '@glimmerx/core';
import Component, { hbs } from '@glimmerx/component';
import { evalSnippet } from './utils/eval-snippet';

function renderSnippet(snippet: string): HTMLElement {
  const element = document.createElement('div');

  const { default: component, services } = evalSnippet(snippet);

  // Call renderComponent withing a Promise resolve so that it doesn't get autotracked
  Promise.resolve().then(() => renderComponent(component, { element, services }));

  return element;
}

export default class Sandbox extends Component<{ snippet: string }> {
  static template = hbs`
    <section class="sandbox">{{renderSnippet @snippet}}</section>
  `;
}
