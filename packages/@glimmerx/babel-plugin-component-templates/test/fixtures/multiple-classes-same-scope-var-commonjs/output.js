"use strict";

var _core = require("@glimmerx/core");

var _component = _interopRequireDefault(require("@glimmerx/component"));

var _somewhere = require("somewhere");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MyComponent extends _component.default {}

(0, _core.setComponentTemplate)(MyComponent, {
  id: "XMWw57ep",
  block: "{\"symbols\":[],\"statements\":[[7,\"h1\",true],[9],[0,\"Hello \"],[5,\"ExternalComponent\",[],[[],[]],null],[10]],\"hasEval\":false}",
  meta: {
    scope: () => ({
      ExternalComponent: _somewhere.OtherComponent
    })
  }
})

class OtherComponent extends _component.default {}

(0, _core.setComponentTemplate)(OtherComponent, {
  id: "XMWw57ep",
  block: "{\"symbols\":[],\"statements\":[[7,\"h1\",true],[9],[0,\"Hello \"],[5,\"ExternalComponent\",[],[[],[]],null],[10]],\"hasEval\":false}",
  meta: {
    scope: () => ({
      ExternalComponent: _somewhere.OtherComponent
    })
  }
})
