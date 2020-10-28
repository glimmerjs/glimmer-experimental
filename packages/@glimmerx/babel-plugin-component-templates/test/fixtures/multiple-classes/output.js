import { setComponentTemplate as _setComponentTemplate } from "@glimmer/core";
import Component from '@glimmerx/component';

class Class1Declaration extends Component {}

_setComponentTemplate({
  id: "9bMgfwbA",
  block: "{\"symbols\":[],\"statements\":[[10,\"h1\"],[12],[2,\"Hello world\"],[13]],\"hasEval\":false,\"upvars\":[]}",
  meta: {
    scope: () => ({})
  }
}, Class1Declaration)

const Class1Expression = _setComponentTemplate({
  id: "9bMgfwbA",
  block: "{\"symbols\":[],\"statements\":[[10,\"h1\"],[12],[2,\"Hello world\"],[13]],\"hasEval\":false,\"upvars\":[]}",
  meta: {
    scope: () => ({})
  }
}, class extends Component {});

class Class2Declaration extends Component {}

_setComponentTemplate({
  id: "+VA0BbEt",
  block: "{\"symbols\":[],\"statements\":[[10,\"h2\"],[12],[2,\"\\n    Goodbye world\\n  \"],[13]],\"hasEval\":false,\"upvars\":[]}",
  meta: {
    scope: () => ({})
  }
}, Class2Declaration)

const Class2Expression = _setComponentTemplate({
  id: "U1swtToI",
  block: "{\"symbols\":[],\"statements\":[[10,\"h2\"],[12],[2,\"\\n    Goodbye world\"],[8,\"Class1Expression\",[],[[],[]],null],[2,\"\\n  \"],[13]],\"hasEval\":false,\"upvars\":[]}",
  meta: {
    scope: () => ({
      Class1Expression: Class1Expression
    })
  }
}, class extends Component {});
