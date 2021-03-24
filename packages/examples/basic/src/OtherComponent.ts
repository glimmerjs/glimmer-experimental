import Component, { hbs } from '@glimmerx/component';

export default class OtherComponent extends Component {
  static template = hbs`
    <div style="padding:5px;background:{{@bgcolor}}">
      <b>Counter Val: {{@count}}</b>
    </div>`;
}
