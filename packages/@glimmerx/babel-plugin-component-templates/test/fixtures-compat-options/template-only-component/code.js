import { hbs } from '@glimmerx/component';
import OtherComponent from './OtherComponent';
import YetAnotherComponent from './YetAnotherComponent';

const template1 = hbs`{{_t "bar"}}<h1>Hello world</h1><OtherComponent/>`;
const template2 = hbs`{{_t "foo"}}<YetAnotherComponent/>`;