import Component, { hbs } from '@glimmerx/component';
import { on } from '@glimmerx/modifier';

export default class SimpleButton extends Component {
  static template = hbs`
    <button type="button" ...attributes {{on "click" @onClick}}>
      {{@count}}
    </button>
  `;
}
