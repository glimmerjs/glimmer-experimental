import OtherComponent from './OtherComponent';
import { hbs } from '@glimmerx/component';

// default export determines how stories show up
export default {
  title: 'OtherComponent stories using CSF',
  component: OtherComponent,
  argTypes: {
    bgcolor: { control: 'color' },
    count: { control: 'number' },
  },
};

// Story template that can be reused for creating and exporting stories
const Template = (args: Record<string, number | string>) => {
  return {
    componentClass: OtherComponent,
    renderOptions: {
      args: {
        ...args,
      },
    },
  };
};

// Creating and exporing basic story
export const Basic = Template.bind({});
Basic.args = {
  count: 100,
};

// Creating and exporting story that builds on top of the basic story
export const Colored = Template.bind({});
Colored.args = {
  ...Basic.args,
  bgcolor: 'pink',
};

// Export an inline story in CSF format
export const inLineBasic = (args) =>
  hbs`<OtherComponent @count={{args.count}} @bgcolor={{args.bgcolor}} }} />`;
inLineBasic.args = {
  ...Basic.args,
  bgcolor: 'lightblue',
};
