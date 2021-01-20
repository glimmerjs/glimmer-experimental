import { setComponentTemplate as _setComponentTemplate } from "@glimmer/core";
import Component from '@glimmerx/component';
import OtherComponent from './OtherComponent';

class MyComponent extends Component {
  get ChildComponent() {
    return _setComponentTemplate({
      "id": "6fvPPcRc",
      "block": "[[[10,\"h2\"],[12],[1,\"Goodbye world\"],[8,[32,0],null,null,null],[13]],[],false,[]]",
      "moduleName": "(unknown template module)",
      "scope": () => [MyComponent],
      "isStrictMode": true
    }, class extends Component {});
  }

}

_setComponentTemplate({
  "id": "7ZfYXn5W",
  "block": "[[[10,\"h1\"],[12],[1,\"Hello world\"],[8,[32,0],null,null,null],[13]],[],false,[]]",
  "moduleName": "(unknown template module)",
  "scope": () => [OtherComponent],
  "isStrictMode": true
}, MyComponent)
