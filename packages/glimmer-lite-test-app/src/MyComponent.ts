import Component from '@glimmer/component';
import { withTemplate } from './utils';
import OtherComponent from './OtherComponent';

class MyComponent extends Component {
  message = "hello world";
  count = 55;
}

export default withTemplate(MyComponent, 
 '<h1>Hello {{this.message}}</h1> <OtherComponent @count={{this.count}} />',
 () => ({ OtherComponent })
);
