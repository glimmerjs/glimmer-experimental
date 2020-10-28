"use strict";

var _core = require("@glimmer/core");

var _component = _interopRequireDefault(require("@glimmerx/component"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Class1Declaration extends _component.default {}

(0, _core.setComponentTemplate)({
  id: "9bMgfwbA",
  block: "{\"symbols\":[],\"statements\":[[10,\"h1\"],[12],[2,\"Hello world\"],[13]],\"hasEval\":false,\"upvars\":[]}",
  meta: {
    scope: () => ({})
  }
}, Class1Declaration)
const Class1Expression = (0, _core.setComponentTemplate)({
  id: "9bMgfwbA",
  block: "{\"symbols\":[],\"statements\":[[10,\"h1\"],[12],[2,\"Hello world\"],[13]],\"hasEval\":false,\"upvars\":[]}",
  meta: {
    scope: () => ({})
  }
}, class extends _component.default {});

class Class2Declaration extends _component.default {}

(0, _core.setComponentTemplate)({
  id: "+VA0BbEt",
  block: "{\"symbols\":[],\"statements\":[[10,\"h2\"],[12],[2,\"\\n    Goodbye world\\n  \"],[13]],\"hasEval\":false,\"upvars\":[]}",
  meta: {
    scope: () => ({})
  }
}, Class2Declaration)
const Class2Expression = (0, _core.setComponentTemplate)({
  id: "U1swtToI",
  block: "{\"symbols\":[],\"statements\":[[10,\"h2\"],[12],[2,\"\\n    Goodbye world\"],[8,\"Class1Expression\",[],[[],[]],null],[2,\"\\n  \"],[13]],\"hasEval\":false,\"upvars\":[]}",
  meta: {
    scope: () => ({
      Class1Expression: Class1Expression
    })
  }
}, class extends _component.default {});
