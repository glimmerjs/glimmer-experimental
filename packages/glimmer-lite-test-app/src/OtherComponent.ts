import Component from '@glimmer/component';

function hbs(_strings: TemplateStringsArray) {
}

export default class OtherComponent extends Component {
  static template = hbs`<b>hi {{@count}}</b>`;
}