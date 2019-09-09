import { setComponentTemplate as _setComponentTemplate } from "@glimmerx/core";
import OtherComponent from './OtherComponent';

class MyComponent extends Component {
  get ChildComponent() {
    return _setComponentTemplate(class extends Component {}, {
      id: "cgsNpVe/",
      block: "{\"symbols\":[],\"statements\":[[7,\"h2\",true],[9],[0,\"Goodbye world\"],[5,\"MyComponent\",[],[[],[]],null],[10]],\"hasEval\":false}",
      meta: {
        scope: () => ({
          MyComponent: MyComponent
        })
      }
    });
  }

}

_setComponentTemplate(MyComponent, {
  id: "8f0eBcY+",
  block: "{\"symbols\":[],\"statements\":[[7,\"h1\",true],[9],[0,\"Hello world\"],[5,\"OtherComponent\",[],[[],[]],null],[10]],\"hasEval\":false}",
  meta: {
    scope: () => ({
      OtherComponent: OtherComponent
    })
  }
})