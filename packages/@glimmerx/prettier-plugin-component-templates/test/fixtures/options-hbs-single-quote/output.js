import Component, { hbs } from '@glimmerx/component';
import myHelper from '../myHelper';

export default class Page extends Component {
  static template = hbs`
    <div class='snazzy'>
      <h1 class='header'>Goodbye Moon</h1>
      {{myHelper 'foo' greeting='Hello'}}
    </div>
  `;
}
