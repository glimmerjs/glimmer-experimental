import Component, { hbs } from '@glimmerx/component';
import Button from './Button';

export default class MyComponent extends Component {
    static template = hbs`
      <h1>Hello world!</h1>
      <Button />
    `
}