import { configure } from '@glimmerx/storybook';

configure(require.context('../src', true, /\.stories\.js$/), module);
