import Component, { hbs } from '@glimmerx/component';
import { OtherComponent as ExternalComponent } from 'somewhere';

class MyComponent extends Component {
  static template = hbs`<h1>Hello <ExternalComponent/></h1>`
}

class OtherComponent extends Component {
  static template = hbs`<h1>Hello <ExternalComponent/></h1>`
}

