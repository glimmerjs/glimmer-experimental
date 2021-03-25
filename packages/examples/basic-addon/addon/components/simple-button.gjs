import Component from '@glimmerx/component';
import { on } from '@glimmerx/modifier';

export default class SimpleButton extends Component {
  <template>
    <button type="button" ...attributes {{on "click" @onClick}}>
      {{@count}}
    </button>
  </template>
}
