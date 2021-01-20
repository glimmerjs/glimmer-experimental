import { setComponentTemplate as _setComponentTemplate } from "@glimmer/core";
import Component from '@glimmerx/component';

class Class1Declaration extends Component {}

_setComponentTemplate({
  "id": "UnWFMClF",
  "block": "[[[10,\"h1\"],[12],[1,\"Hello world\"],[13]],[],false,[]]",
  "moduleName": "(unknown template module)",
  "scope": null,
  "isStrictMode": true
}, Class1Declaration)

const Class1Expression = _setComponentTemplate({
  "id": "UnWFMClF",
  "block": "[[[10,\"h1\"],[12],[1,\"Hello world\"],[13]],[],false,[]]",
  "moduleName": "(unknown template module)",
  "scope": null,
  "isStrictMode": true
}, class extends Component {});

class Class2Declaration extends Component {}

_setComponentTemplate({
  "id": "PN1+SdGD",
  "block": "[[[10,\"h2\"],[12],[1,\"\\n    Goodbye world\\n  \"],[13]],[],false,[]]",
  "moduleName": "(unknown template module)",
  "scope": null,
  "isStrictMode": true
}, Class2Declaration)

const Class2Expression = _setComponentTemplate({
  "id": "E/B0dLEA",
  "block": "[[[10,\"h2\"],[12],[1,\"\\n    Goodbye world\"],[8,[32,0],null,null,null],[1,\"\\n  \"],[13]],[],false,[]]",
  "moduleName": "(unknown template module)",
  "scope": () => [Class1Expression],
  "isStrictMode": true
}, class extends Component {});
