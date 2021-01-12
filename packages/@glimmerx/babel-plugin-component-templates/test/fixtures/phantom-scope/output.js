import { setComponentTemplate as _setComponentTemplate } from "@glimmer/core";
import Component from '@glimmerx/component';
import OtherComponent from './OtherComponent';
import PhantomComponent from './PhantomComponent';

class MyComponent extends Component {}

_setComponentTemplate({
  "id": "vVhfCDf6",
  "block": "[[[10,\"h1\"],[12],[1,\"Hello world \"],[8,[32,0],null,null,null],[1,\" \"],[13]],[],false,[]]",
  "moduleName": "(unknown template module)",
  "scope": () => [OtherComponent],
  "isStrictMode": true
}, MyComponent)
