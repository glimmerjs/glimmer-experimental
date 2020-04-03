import Component, { hbs } from '@glimmerx/component';
import { Dict } from '@glimmer/interfaces';
import MaybeComponent from './somewhere-else';
const unknownValue = null;
const maybeModifier = null;

export function foo(): Dict<unknown> {
  return {};
}

export class MyComponent extends Component {
  static template = hbs`<h1 {{maybeModifier}}>Hello world {{unknownValue}}<MySubComponent><MaybeComponent /></MySubComponent></h1>`;
}
