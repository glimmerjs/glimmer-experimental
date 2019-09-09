
import OtherComponent from './OtherComponent';
import PhantomComponent from './PhantomComponent';


class MyComponent extends Component {
  static template = hbs`<h1>Hello world <OtherComponent /> </h1>`;
}