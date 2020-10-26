import { setComponentTemplate as _setComponentTemplate } from "@glimmer/core";
import Component from '@glimmerx/component';
import OtherComponent from './OtherComponent';
import PhantomComponent from './PhantomComponent';

class MyComponent extends Component {}

_setComponentTemplate({
  id: "6F9NpduU",
  block: "{\"symbols\":[],\"statements\":[[10,\"h1\"],[12],[2,\"Hello world \"],[8,\"OtherComponent\",[],[[],[]],null],[2,\" \"],[13]],\"hasEval\":false,\"upvars\":[]}",
  meta: {
    scope: () => ({
      OtherComponent: OtherComponent
    })
  }
}, MyComponent)
