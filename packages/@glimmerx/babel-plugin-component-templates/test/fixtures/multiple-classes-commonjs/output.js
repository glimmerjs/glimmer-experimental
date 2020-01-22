"use strict";

var _core = require("@glimmerx/core");

var _component = _interopRequireDefault(require("@glimmerx/component"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Class1Declaration extends _component.default {}

(0, _core.setComponentTemplate)(Class1Declaration, {
  id: "pX6MO7j4",
  block: "{\"symbols\":[],\"statements\":[[7,\"h1\",true],[9],[0,\"Hello world\"],[10]],\"hasEval\":false}",
  meta: {
    scope: () => ({})
  }
})
const Class1Expression = (0, _core.setComponentTemplate)(class extends _component.default {}, {
  id: "pX6MO7j4",
  block: "{\"symbols\":[],\"statements\":[[7,\"h1\",true],[9],[0,\"Hello world\"],[10]],\"hasEval\":false}",
  meta: {
    scope: () => ({})
  }
});

class Class2Declaration extends _component.default {}

(0, _core.setComponentTemplate)(Class2Declaration, {
  id: "K+OefGFw",
  block: "{\"symbols\":[],\"statements\":[[7,\"h2\",true],[9],[0,\"\\n    Goodbye world\\n  \"],[10]],\"hasEval\":false}",
  meta: {
    scope: () => ({})
  }
})
const Class2Expression = (0, _core.setComponentTemplate)(class extends _component.default {}, {
  id: "y8Jq1bmF",
  block: "{\"symbols\":[],\"statements\":[[7,\"h2\",true],[9],[0,\"\\n    Goodbye world\"],[5,\"Class1Expression\",[],[[],[]],null],[0,\"\\n  \"],[10]],\"hasEval\":false}",
  meta: {
    scope: () => ({
      Class1Expression: Class1Expression
    })
  }
});
