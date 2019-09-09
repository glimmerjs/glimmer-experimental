import { setComponentTemplate as _setComponentTemplate } from "@glimmerx/core";
import OtherComponent from './OtherComponent';
import PhantomComponent from './PhantomComponent';

class MyComponent extends Component {}

_setComponentTemplate(MyComponent, {
  id: "F79ueTVP",
  block: "{\"symbols\":[],\"statements\":[[7,\"h1\",true],[9],[0,\"Hello world \"],[5,\"OtherComponent\",[],[[],[]],null],[0,\" \"],[10]],\"hasEval\":false}",
  meta: {
    scope: () => ({
      OtherComponent: OtherComponent
    })
  }
})