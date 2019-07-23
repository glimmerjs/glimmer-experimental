import Component from '@glimmer/component';
import { hbs } from './utils';

export default class OtherComponent extends Component {
  static template = hbs('<b>hi {{@count}}</b>');
}