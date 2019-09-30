import Component, { tracked, hbs } from '@glimmerx/component';
import { helper } from '@glimmerx/helper';
import OtherComponent from './OtherComponent';
import { service } from '@glimmerx/service';
import { on, action } from '@glimmerx/modifier';
import LocaleService from './services/LocaleService';

const myHelper = helper(function([name], { greeting }) {
  return `Helper: ${greeting} ${name}`;
});

const isCJK = helper(function(args, hash, { services }) {
  const localeService = services!.locale as LocaleService;
  return localeService.currentLocale === 'zh_CN' ||
         localeService.currentLocale === 'ko_KO' ||
         localeService.currentLocale === 'ja_JP';
});

class MyComponent extends Component {
  static template = hbs`
    <h1>Hello {{this.message}}</h1> <br/>
    {{myHelper "foo" greeting="Hello"}}
    <p>Current locale: {{this.currentLocale}}</p>
    {{#if (isCJK)}}
      <p>Component is in a CJK locale</p>
    {{else}}
      <p>Component is not in a CJK locale</p>
    {{/if}}

    <OtherComponent @count={{this.count}} /> <br/>
    <button {{on "click" this.increment}}>Increment</button>
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
