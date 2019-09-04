import { helper } from '@glimmerx/core';
import Component, { tracked, hbs } from '@glimmerx/component';
import OtherComponent from './OtherComponent';

const myHelper = helper(function ([name], {greeting}) {
  return `Helper: ${greeting} ${name}`;
});

class MyComponent extends Component {
  static template = hbs`
    <h1>Hello {{this.message}}</h1>
    <OtherComponent @count={{this.count}} />
    {{myHelper "foo" greeting="Hello"}}
  `

  message = 'hello world';
  @tracked count = 55;

  constructor(owner: unknown, args: object) {
    super(owner, args);
    setInterval(() => {
      this.count++;
    }, 16);
  }
}

export default MyComponent;
