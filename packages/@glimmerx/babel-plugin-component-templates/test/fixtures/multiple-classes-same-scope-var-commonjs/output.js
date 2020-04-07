"use strict";

var _core = require("@glimmer/core");

var _component = _interopRequireDefault(require("@glimmerx/component"));

var _somewhere = require("somewhere");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MyComponent extends _component.default {}

(0, _core.setComponentTemplate)({
  id: "wvnbwYrJ",
  block: "{\"symbols\":[],\"statements\":[[9,\"h1\",true],[10],[1,1,0,0,\"Hello \"],[7,\"ExternalComponent\",[],[[],[]],null],[11]],\"hasEval\":false,\"upvars\":[]}",
  meta: {
    scope: () => ({
      ExternalComponent: _somewhere.OtherComponent
    })
  }
}, MyComponent)

class OtherComponent extends _component.default {}

(0, _core.setComponentTemplate)({
  id: "wvnbwYrJ",
  block: "{\"symbols\":[],\"statements\":[[9,\"h1\",true],[10],[1,1,0,0,\"Hello \"],[7,\"ExternalComponent\",[],[[],[]],null],[11]],\"hasEval\":false,\"upvars\":[]}",
  meta: {
    scope: () => ({
      ExternalComponent: _somewhere.OtherComponent
    })
  }
}, OtherComponent)
