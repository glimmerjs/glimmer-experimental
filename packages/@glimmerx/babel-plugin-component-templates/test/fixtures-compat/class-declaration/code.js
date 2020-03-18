import Component, { hbs } from '@glimmerx/component';

class MyComponent extends Component {
  static template = hbs`<h1>{{_t "foo"}}</h1>`;
}