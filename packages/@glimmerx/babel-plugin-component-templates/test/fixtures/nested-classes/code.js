
import OtherComponent from './OtherComponent';

class MyComponent extends Component {
  static template = hbs`<h1>Hello world<OtherComponent/></h1>`;

  get ChildComponent() {
    return class extends Component {
      static template = hbs`<h2>Goodbye world<MyComponent/></h2>`;
    }
  }
}