import Component from '@glimmer/component';
import { withTemplate } from './utils';

class OtherComponent extends Component {

}

export default withTemplate(OtherComponent,
  '<b>hi {{@count}}</b>',
  () => ({})
);
