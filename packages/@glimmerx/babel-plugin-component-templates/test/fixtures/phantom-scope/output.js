import { setComponentTemplate as _setComponentTemplate } from "@glimmer/core";
import Component from '@glimmerx/component';
import OtherComponent from './OtherComponent';
import PhantomComponent from './PhantomComponent';

class MyComponent extends Component {}

_setComponentTemplate(MyComponent, {
  id: "CUkt0JBr",
  block: "{\"symbols\":[],\"statements\":[[9,\"h1\",true],[10],[1,1,0,0,\"Hello world \"],[7,\"OtherComponent\",[],[[],[]],null],[1,1,0,0,\" \"],[11]],\"hasEval\":false,\"upvars\":[]}",
  meta: {
    scope: () => ({
      OtherComponent: OtherComponent
    })
  }
})
