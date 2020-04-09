import Component, { hbs, tracked } from '@glimmerx/component';
import { on, action } from '@glimmerx/modifier';
import monaco from './monaco';

import logo from './logo.svg';
import { copyToClipboard } from './utils/copy-to-clipboard';

function setupEditor(
  element: HTMLElement,
  initialValue: string,
  updateSnippet: (snip: string) => void
): () => void {
  const editor = monaco.editor.create(element, {
    value: initialValue,
    language: 'glimmer',

    tabSize: 2,
    insertSpaces: true,
    lineNumbers: 'off',
    minimap: {
      enabled: false,
    },
    roundedSelection: false,
    readOnly: false,
    theme: 'horizon',
  });

  const updateLayout = (): void => {
    const lineHeight = editor.getOptions().get(monaco.editor.EditorOption.lineHeight);
    const lineCount = editor.getModel().getLineCount();
    const contentHeight = lineHeight * lineCount + 12;

    element.style.height = `${contentHeight}px`;
    editor.layout();
  };

  updateLayout();

  editor.onDidChangeModelContent(() => {
    updateSnippet(editor.getValue());
    updateLayout();
  });

  window.addEventListener('resize', updateLayout);

  return (): void => {
    editor.dispose();
    window.removeEventListener('resize', updateLayout);
  };
}

interface EditorArgs {
  snippet: string;
  onChange: (snip: string) => void;
}

export default class Editor extends Component<EditorArgs> {
  logo = logo;

  // This is a hack because we don't have a full modifier API yet. This
  // disconnects the value so it isn't autotracked, and the functional modifier
  // doesn't rerun. In the long run, we should have a class-modifier that
  // manages the long-lived state of the monaco editor.
  //
  // TODO: Replace once @glimmerx/modifier ships a class-modifier impl
  initialSnippet = this.args.snippet;

  @tracked displayClicked = false;

  @action copyLink(): void {
    copyToClipboard(window.location.href);

    this.displayClicked = true;

    setTimeout(() => (this.displayClicked = false), 3000);
  }

  static template = hbs`
    <section class="editor">
      <nav>
        <img src={{this.logo}} class="logo" />

        <span class="divider"></span>

        <button
          type="button"
          class="share {{if this.displayClicked "clicked"}}"
          {{on "click" this.copyLink}}
        >
          Share
        </button>
        <a href="https://github.com/glimmerjs/glimmer-experimental">GitHub</a>
      </nav>
      <div {{setupEditor this.initialSnippet @onChange}} class="buffer"></div>
    </section>
  `;
}
