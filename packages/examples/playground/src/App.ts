import Component, { hbs, tracked } from '@glimmerx/component';
import { action } from '@glimmerx/modifier';
import Editor from './Editor';
import Sandbox from './Sandbox';

import './App.css';

const DEFAULT_SNIPPET = `
import Component, { hbs, tracked } from '@glimmerx/component';
import { on, action } from '@glimmerx/modifier';

export default class HelloWorld extends Component {
  @tracked count = 1;

  @action increment() {
    this.count++;
  }

  static template = hbs\`
    <h1>Welcome to the GlimmerX Playground!</h1>

    <p>You have clicked the button {{this.count}} times.</p>

    <button {{on "click" this.increment}}>Click</button>
  \`;
}
`;

export default class App extends Component {
  @tracked snippet = new URLSearchParams(location.search).get('snippet') || DEFAULT_SNIPPET;

  @action updateSnippet(snippet: string): void {
    const params = new URLSearchParams(location.search);
    params.set('snippet', snippet);
    window.history.replaceState({}, '', `${location.pathname}?${params.toString()}`);

    this.snippet = snippet;
  }

  static template = hbs`
    <Editor @snippet={{this.snippet}} @onChange={{this.updateSnippet}} />
    <Sandbox @snippet={{this.snippet}} />
  `;
}
