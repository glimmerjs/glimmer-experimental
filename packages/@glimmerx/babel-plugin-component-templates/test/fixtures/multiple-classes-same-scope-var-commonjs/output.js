"use strict";

var _core = require("@glimmer/core");

var _component = _interopRequireDefault(require("@glimmerx/component"));

var _somewhere = require("somewhere");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MyComponent extends _component.default {}

(0, _core.setComponentTemplate)({
  "id": "rUcvMrKh",
  "block": "[[[10,\"h1\"],[12],[1,\"Hello \"],[8,[32,0],null,null,null],[13]],[],false,[]]",
  "moduleName": "(unknown template module)",
  "scope": () => [_somewhere.OtherComponent],
  "isStrictMode": true
}, MyComponent)

class OtherComponent extends _component.default {}

(0, _core.setComponentTemplate)({
  "id": "rUcvMrKh",
  "block": "[[[10,\"h1\"],[12],[1,\"Hello \"],[8,[32,0],null,null,null],[13]],[],false,[]]",
  "moduleName": "(unknown template module)",
  "scope": () => [_somewhere.OtherComponent],
  "isStrictMode": true
}, OtherComponent)
