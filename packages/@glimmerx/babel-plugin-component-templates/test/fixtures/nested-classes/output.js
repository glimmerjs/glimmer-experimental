import { setComponentTemplate as _setComponentTemplate } from "@glimmer/core";
import Component from '@glimmerx/component';
import OtherComponent from './OtherComponent';

class MyComponent extends Component {
  get ChildComponent() {
    return _setComponentTemplate({
      id: "z5SJXwaW",
      block: "{\"symbols\":[],\"statements\":[[9,\"h2\",true],[10],[1,1,0,0,\"Goodbye world\"],[7,\"MyComponent\",[],[[],[]],null],[11]],\"hasEval\":false,\"upvars\":[]}",
      meta: {
        scope: () => ({
          MyComponent: MyComponent
        })
      }
    }, class extends Component {});
  }

}

_setComponentTemplate({
  id: "O/CNYunf",
  block: "{\"symbols\":[],\"statements\":[[9,\"h1\",true],[10],[1,1,0,0,\"Hello world\"],[7,\"OtherComponent\",[],[[],[]],null],[11]],\"hasEval\":false,\"upvars\":[]}",
  meta: {
    scope: () => ({
      OtherComponent: OtherComponent
    })
  }
}, MyComponent)
