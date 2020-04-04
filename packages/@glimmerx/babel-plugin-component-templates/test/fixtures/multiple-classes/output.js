import { setComponentTemplate as _setComponentTemplate } from "@glimmer/core";
import Component from '@glimmerx/component';

class Class1Declaration extends Component {}

_setComponentTemplate({
  id: "hzw7dJc0",
  block: "{\"symbols\":[],\"statements\":[[9,\"h1\",true],[10],[1,1,0,0,\"Hello world\"],[11]],\"hasEval\":false,\"upvars\":[]}",
  meta: {
    scope: () => ({})
  }
}, Class1Declaration)

const Class1Expression = _setComponentTemplate({
  id: "hzw7dJc0",
  block: "{\"symbols\":[],\"statements\":[[9,\"h1\",true],[10],[1,1,0,0,\"Hello world\"],[11]],\"hasEval\":false,\"upvars\":[]}",
  meta: {
    scope: () => ({})
  }
}, class extends Component {});

class Class2Declaration extends Component {}

_setComponentTemplate({
  id: "85zTPBgs",
  block: "{\"symbols\":[],\"statements\":[[9,\"h2\",true],[10],[1,1,0,0,\"\\n    Goodbye world\\n  \"],[11]],\"hasEval\":false,\"upvars\":[]}",
  meta: {
    scope: () => ({})
  }
}, Class2Declaration)

const Class2Expression = _setComponentTemplate({
  id: "d1fbtzoG",
  block: "{\"symbols\":[],\"statements\":[[9,\"h2\",true],[10],[1,1,0,0,\"\\n    Goodbye world\"],[7,\"Class1Expression\",[],[[],[]],null],[1,1,0,0,\"\\n  \"],[11]],\"hasEval\":false,\"upvars\":[]}",
  meta: {
    scope: () => ({
      Class1Expression: Class1Expression
    })
  }
}, class extends Component {});
