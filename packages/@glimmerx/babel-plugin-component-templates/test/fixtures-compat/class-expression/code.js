import Component, { hbs } from '@glimmerx/component';

const MyComponent = class extends Component {
  static template = hbs`<h1>{{_t "foo"}}</h1>`;
}