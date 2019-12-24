import { storiesOf } from '@glimmerx/storybook';
import OtherComponent from './OtherComponent';
import Component, { hbs } from '@glimmerx/component';

class WrapperComponent extends Component {
  static template = hbs`<OtherComponent @count=101/>`;
}

storiesOf('Example Stories', module).add('OtherComponent', () => WrapperComponent);
