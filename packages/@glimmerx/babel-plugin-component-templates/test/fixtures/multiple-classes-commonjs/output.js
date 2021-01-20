"use strict";

var _core = require("@glimmer/core");

var _component = _interopRequireDefault(require("@glimmerx/component"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Class1Declaration extends _component.default {}

(0, _core.setComponentTemplate)({
  "id": "UnWFMClF",
  "block": "[[[10,\"h1\"],[12],[1,\"Hello world\"],[13]],[],false,[]]",
  "moduleName": "(unknown template module)",
  "scope": null,
  "isStrictMode": true
}, Class1Declaration)
const Class1Expression = (0, _core.setComponentTemplate)({
  "id": "UnWFMClF",
  "block": "[[[10,\"h1\"],[12],[1,\"Hello world\"],[13]],[],false,[]]",
  "moduleName": "(unknown template module)",
  "scope": null,
  "isStrictMode": true
}, class extends _component.default {});

class Class2Declaration extends _component.default {}

(0, _core.setComponentTemplate)({
  "id": "PN1+SdGD",
  "block": "[[[10,\"h2\"],[12],[1,\"\\n    Goodbye world\\n  \"],[13]],[],false,[]]",
  "moduleName": "(unknown template module)",
  "scope": null,
  "isStrictMode": true
}, Class2Declaration)
const Class2Expression = (0, _core.setComponentTemplate)({
  "id": "E/B0dLEA",
  "block": "[[[10,\"h2\"],[12],[1,\"\\n    Goodbye world\"],[8,[32,0],null,null,null],[1,\"\\n  \"],[13]],[],false,[]]",
  "moduleName": "(unknown template module)",
  "scope": () => [Class1Expression],
  "isStrictMode": true
}, class extends _component.default {});
