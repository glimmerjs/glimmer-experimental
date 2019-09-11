import Component, { hbs } from '@glimmerx/component';

export default class OtherComponent extends Component {
  static template = hbs`<b>hi {{@count}}</b>`;
}
