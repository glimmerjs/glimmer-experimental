import Component, { hbs } from '@glimmerx/component';
import OtherComponent from './OtherComponent';
const unknownValue = null;
const MaybeComponent = null;
const maybeModifier = null;
class MyComponent extends Component {
  static template = hbs`<h1 {{maybeModifier}}>Hello world {{unknownValue}}<MySubComponent><MaybeComponent /></MySubComponent></h1>`;
}