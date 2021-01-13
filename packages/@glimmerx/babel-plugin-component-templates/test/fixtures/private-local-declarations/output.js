import { setComponentTemplate as _setComponentTemplate } from "@glimmer/core";
import Component from '@glimmerx/component';

function root() {
  function nested() {
    class OtherComponent extends Component {}

    _setComponentTemplate({
      id: "L9WxEO3m",
      block: "{\"symbols\":[],\"statements\":[[2,\"Hello World\"]],\"hasEval\":false,\"upvars\":[]}",
      meta: {
        scope: () => ({})
      }
    }, OtherComponent)

    class MyComponent extends Component {}

    _setComponentTemplate({
      id: "X+3KCppa",
      block: "{\"symbols\":[],\"statements\":[[10,\"h1\"],[12],[8,\"OtherComponent\",[],[[],[]],null],[13]],\"hasEval\":false,\"upvars\":[]}",
      meta: {
        scope: () => ({
          OtherComponent: OtherComponent
        })
      }
    }, MyComponent)
  }
}
