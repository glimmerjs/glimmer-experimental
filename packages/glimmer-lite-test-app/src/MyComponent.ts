import { Component } from 'glimmer-lite-core';
import { tracked } from '@glimmer/component';

import OtherComponent from './OtherComponent';
import { hbs } from './utils';

export default class MyComponent extends Component {
  static template = hbs(
    `<h1>Hello {{this.message}}</h1> <OtherComponent @count={{this.count}} />`,
    () => ({ OtherComponent })
  );

  message = 'hello world';
  @tracked count = 55;

  constructor(owner: unknown, args: object) {
    super(owner, args);
    setInterval(() => {
      this.count++;
    }, 16);
  }
}