import { storiesOf } from '@glimmerx/storybook';
import OtherComponent from './OtherComponent';
import { hbs } from '@glimmerx/component';

storiesOf('Example Stories', module).add('OtherComponent', () => hbs`<OtherComponent @count=101/>`);
