import { Component } from 'glimmer-lite-core';
import { withTemplate } from './utils';
import OtherComponent from './OtherComponent';
import { tracked } from '@glimmer/component';

class MyComponent extends Component {
  message = "hello world";
  @tracked count = 55;

  constructor(owner: unknown, args: object) {
    super(owner, args);
    setInterval(() => {
      this.count++;
    }, 16);
  }
}

export default withTemplate(MyComponent, 
 '<h1>Hello {{this.message}}</h1> <OtherComponent @count={{this.count}} />',
 () => ({ OtherComponent })
);
