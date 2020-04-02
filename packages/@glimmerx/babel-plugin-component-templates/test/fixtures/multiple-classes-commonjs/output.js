"use strict";

var _core = require("@glimmer/core");

var _component = _interopRequireDefault(require("@glimmerx/component"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Class1Declaration extends _component.default {}

(0, _core.setComponentTemplate)(Class1Declaration, {
  id: "hzw7dJc0",
  block: "{\"symbols\":[],\"statements\":[[9,\"h1\",true],[10],[1,1,0,0,\"Hello world\"],[11]],\"hasEval\":false,\"upvars\":[]}",
  meta: {
    scope: () => ({})
  }
})
const Class1Expression = (0, _core.setComponentTemplate)(class extends _component.default {}, {
  id: "hzw7dJc0",
  block: "{\"symbols\":[],\"statements\":[[9,\"h1\",true],[10],[1,1,0,0,\"Hello world\"],[11]],\"hasEval\":false,\"upvars\":[]}",
  meta: {
    scope: () => ({})
  }
});

class Class2Declaration extends _component.default {}

(0, _core.setComponentTemplate)(Class2Declaration, {
  id: "85zTPBgs",
  block: "{\"symbols\":[],\"statements\":[[9,\"h2\",true],[10],[1,1,0,0,\"\\n    Goodbye world\\n  \"],[11]],\"hasEval\":false,\"upvars\":[]}",
  meta: {
    scope: () => ({})
  }
})
const Class2Expression = (0, _core.setComponentTemplate)(class extends _component.default {}, {
  id: "d1fbtzoG",
  block: "{\"symbols\":[],\"statements\":[[9,\"h2\",true],[10],[1,1,0,0,\"\\n    Goodbye world\"],[7,\"Class1Expression\",[],[[],[]],null],[1,1,0,0,\"\\n  \"],[11]],\"hasEval\":false,\"upvars\":[]}",
  meta: {
    scope: () => ({
      Class1Expression: Class1Expression
    })
  }
});
