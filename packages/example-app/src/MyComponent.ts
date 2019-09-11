import Component, { tracked, hbs } from '@glimmerx/component';
import helper from '@glimmerx/helper';
import OtherComponent from './OtherComponent';
import { service } from '@glimmerx/service';
import LocaleService from './services/LocaleService';

const myHelper = helper(function ([name], {greeting}) {
  return `Helper: ${greeting} ${name}`;
});

class MyComponent extends Component {
  static template = hbs`
    <h1>Hello {{this.message}}</h1>
    <OtherComponent @count={{this.count}} />
    {{myHelper "foo" greeting="Hello"}}
    <p>Current locale: {{this.currentLocale}}</p>
  `

  message = 'hello world';
  @tracked count = 55;
  @service locale: LocaleService;

  constructor(owner: unknown, args: object) {
    super(owner, args);
    setInterval(() => {
      this.count++;
    }, 16);
  }

  get currentLocale() {
    return this.locale.currentLocale;
  }
}

export default MyComponent;
