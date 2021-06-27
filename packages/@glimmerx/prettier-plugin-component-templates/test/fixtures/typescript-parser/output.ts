import Component, { tracked, hbs } from '@glimmerx/component';
import { helper } from '@glimmerx/helper';
import OtherComponent from './OtherComponent';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import GtsComponent from './GtsComponent';
import { service } from '@glimmerx/service';
import { on, action } from '@glimmerx/modifier';
import LocaleService from './services/LocaleService';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ButtonList } from 'basic-addon';

const myHelper = helper(function ([name]: [string], { greeting }: { greeting: string }) {
  return `Helper: ${greeting} ${name}`;
});

const isCJK = helper(function (_args, _hash, { services }) {
  const localeService = services!.locale as LocaleService;
  return (
    localeService.currentLocale === 'zh_CN' ||
    localeService.currentLocale === 'ko_KO' ||
    localeService.currentLocale === 'ja_JP'
  );
});

// Should not wrap
const TemplateOnlyComponent = hbs`<h1>I am rendered by a template only component: {{@name}}</h1>`;

// Should wrap
const AnotherTemplateOnlyComponent = hbs`
  <h1>I am rendered by a template only component: {{@name}}</h1>
`;

class MyComponent extends Component {
  // @tsignore

  #somePrivate() {}

  constructor(...args) {
    // @tsignore
    super(...args);
    this.#somePrivate(); // Write me!
  }

  static template = hbs`
    <h1>Hello {{this.message}}</h1>
    <br />
    {{myHelper "foo" greeting="Hello"}}
    <p>Current locale: {{this.currentLocale}}</p>
    {{#if (isCJK)}}
      <p>Component is in a CJK locale</p>
    {{else}}
      <p>Component is not in a CJK locale</p>
    {{/if}}
    <div>
      Other Component:
      <OtherComponent @count={{this.count}} />
    </div>
    <div>
      Gts Component:
      <GtsComponent @count={{this.count}} />
    </div>
    <button {{on "click" this.increment}}>Increment</button>
    <TemplateOnlyComponent @name="For Glimmerx" />
    <ButtonList />
  `;

  message = 'hello world';
  @tracked count = 55;
  @service locale: LocaleService;

  get currentLocale() {
    return this.locale.currentLocale;
  }

  @action
  increment() {
    this.count++;
  }
}

export default MyComponent;
