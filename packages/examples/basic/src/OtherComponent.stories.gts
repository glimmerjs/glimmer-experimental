// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { storiesOf } from '@glimmerx/storybook';
import OtherComponent from './OtherComponent';
import { hbs } from '@glimmerx/component';

storiesOf('OtherComponent Stories', module)
  .add('Basic with hbs', () => <template><OtherComponent @count=101/></template>)
  .add('With render options', () => ({
    componentClass: OtherComponent,
    renderOptions: {
      args: {
        count: 1007,
      },
    },
  }));
