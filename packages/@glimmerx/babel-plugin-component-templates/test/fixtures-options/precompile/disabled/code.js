import Component, { hbs } from '@glimmerx/component';
import OtherComponent from './OtherComponent';
import YetAnotherComponent from './YetAnotherComponent';

class MyComponent extends Component {
  static template = hbs`<h1>Hello world</h1><OtherComponent/>`;
}

const MyComponentExpression = class extends Component {
  static template = hbs`<YetAnotherComponent/>`;
};