import { storiesOf } from '@glimmerx/storybook';
import Component, { hbs } from '@glimmerx/component';
import OtherComponent from './OtherComponent';

storiesOf('Example Stories', module).add('OtherComponent', () => OtherComponent);
