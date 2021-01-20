import { setComponentTemplate as _setComponentTemplate } from "@glimmer/core";
import Component from '@glimmerx/component';

function root() {
  function nested() {
    class OtherComponent extends Component {}

    _setComponentTemplate({
      "id": "JlcONgyA",
      "block": "[[[1,\"Hello World\"]],[],false,[]]",
      "moduleName": "(unknown template module)",
      "scope": null,
      "isStrictMode": true
    }, OtherComponent)

    class MyComponent extends Component {}

    _setComponentTemplate({
      "id": "L6QsX14w",
      "block": "[[[10,\"h1\"],[12],[8,[32,0],null,null,null],[13]],[],false,[]]",
      "moduleName": "(unknown template module)",
      "scope": () => [OtherComponent],
      "isStrictMode": true
    }, MyComponent)
  }
}
