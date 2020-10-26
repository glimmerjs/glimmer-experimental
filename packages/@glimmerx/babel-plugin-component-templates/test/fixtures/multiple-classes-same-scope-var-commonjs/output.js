"use strict";

var _core = require("@glimmer/core");

var _component = _interopRequireDefault(require("@glimmerx/component"));

var _somewhere = require("somewhere");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MyComponent extends _component.default {}

(0, _core.setComponentTemplate)({
  id: "KK5UHDcn",
  block: "{\"symbols\":[],\"statements\":[[10,\"h1\"],[12],[2,\"Hello \"],[8,\"ExternalComponent\",[],[[],[]],null],[13]],\"hasEval\":false,\"upvars\":[]}",
  meta: {
    scope: () => ({
      ExternalComponent: _somewhere.OtherComponent
    })
  }
}, MyComponent)

class OtherComponent extends _component.default {}

(0, _core.setComponentTemplate)({
  id: "KK5UHDcn",
  block: "{\"symbols\":[],\"statements\":[[10,\"h1\"],[12],[2,\"Hello \"],[8,\"ExternalComponent\",[],[[],[]],null],[13]],\"hasEval\":false,\"upvars\":[]}",
  meta: {
    scope: () => ({
      ExternalComponent: _somewhere.OtherComponent
    })
  }
}, OtherComponent)
