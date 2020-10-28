import { setComponentTemplate as _setComponentTemplate } from "@glimmer/core";
import Component from '@glimmerx/component';
import OtherComponent from './OtherComponent';

class MyComponent extends Component {
  get ChildComponent() {
    return _setComponentTemplate({
      id: "+zgtSPG4",
      block: "{\"symbols\":[],\"statements\":[[10,\"h2\"],[12],[2,\"Goodbye world\"],[8,\"MyComponent\",[],[[],[]],null],[13]],\"hasEval\":false,\"upvars\":[]}",
      meta: {
        scope: () => ({
          MyComponent: MyComponent
        })
      }
    }, class extends Component {});
  }

}

_setComponentTemplate({
  id: "9oyaIEZ1",
  block: "{\"symbols\":[],\"statements\":[[10,\"h1\"],[12],[2,\"Hello world\"],[8,\"OtherComponent\",[],[[],[]],null],[13]],\"hasEval\":false,\"upvars\":[]}",
  meta: {
    scope: () => ({
      OtherComponent: OtherComponent
    })
  }
}, MyComponent)
