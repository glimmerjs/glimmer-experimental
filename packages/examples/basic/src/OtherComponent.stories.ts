import { storiesOf } from '@glimmerx/storybook';
import OtherComponent from './OtherComponent';
import { hbs } from '@glimmerx/component';

storiesOf('OtherComponent Stories', module)
  .add('Basic with hbs', () => hbs`<OtherComponent @count=101/>`)
  .add('With render options', () => ({
    componentClass: OtherComponent,
    renderOptions: {
      args: {
        count: 1007,
      },
    },
  }));
