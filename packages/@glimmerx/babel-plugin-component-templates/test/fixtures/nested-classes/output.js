import { setComponentTemplate as _setComponentTemplate } from "@glimmerx/core";
import OtherComponent from './OtherComponent';

class MyComponent extends Component {
  get ChildComponent() {
    return _setComponentTemplate(class extends Component {}, {
      id: "AIfYIlZS",
      block: "{\"symbols\":[],\"statements\":[[7,\"h2\",true],[9],[0,\"Goodbye world\"],[10]],\"hasEval\":false}",
      meta: {
        scope: () => ({
          OtherComponent,
          MyComponent
        })
      }
    });
  }

}

_setComponentTemplate(MyComponent, {
  id: "pX6MO7j4",
  block: "{\"symbols\":[],\"statements\":[[7,\"h1\",true],[9],[0,\"Hello world\"],[10]],\"hasEval\":false}",
  meta: {
    scope: () => ({
      OtherComponent,
      MyComponent
    })
  }
})