import { TOComponent as _TOComponent } from "@glimmerx/some-component-path";
import { dangerouslySetComponentTemplate as _dangerouslySetComponentTemplate } from "@glimmerx/other-package";
import Component from '@glimmerx/component';

class Class1Declaration extends Component {}

_dangerouslySetComponentTemplate({
  "id": "UnWFMClF",
  "block": "[[[10,\"h1\"],[12],[1,\"Hello world\"],[13]],[],false,[]]",
  "moduleName": "(unknown template module)",
  "scope": null,
  "isStrictMode": true
}, Class1Declaration)

const Class1Expression = _dangerouslySetComponentTemplate({
  "id": "UnWFMClF",
  "block": "[[[10,\"h1\"],[12],[1,\"Hello world\"],[13]],[],false,[]]",
  "moduleName": "(unknown template module)",
  "scope": null,
  "isStrictMode": true
}, class extends Component {});

class Class2Declaration extends Component {}

_dangerouslySetComponentTemplate({
  "id": "PN1+SdGD",
  "block": "[[[10,\"h2\"],[12],[1,\"\\n    Goodbye world\\n  \"],[13]],[],false,[]]",
  "moduleName": "(unknown template module)",
  "scope": null,
  "isStrictMode": true
}, Class2Declaration)

const Class2Expression = _dangerouslySetComponentTemplate({
  "id": "E/B0dLEA",
  "block": "[[[10,\"h2\"],[12],[1,\"\\n    Goodbye world\"],[8,[32,0],null,null,null],[1,\"\\n  \"],[13]],[],false,[]]",
  "moduleName": "(unknown template module)",
  "scope": () => [Class2Declaration],
  "isStrictMode": true
}, class extends Component {});

const TOComponent = _dangerouslySetComponentTemplate({
  "id": "fyKZX1dI",
  "block": "[[[10,\"h3\"],[12],[1,\"Hello again world\"],[8,[32,0],null,null,null],[13]],[],false,[]]",
  "moduleName": "(unknown template module)",
  "scope": () => [Class2Expression],
  "isStrictMode": true
}, _TOComponent());
