import Component, { hbs } from '@glimmerx/component';

class MyComponent extends Component {
  static template = hbs`{{bad}}<h1>Hello world</h1>`;
}
