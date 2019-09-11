import { setComponentTemplate as _setComponentTemplate } from "@glimmerx/core";

class Class1Declaration extends Component {}

_setComponentTemplate(Class1Declaration, {
  id: "pX6MO7j4",
  block: "{\"symbols\":[],\"statements\":[[7,\"h1\",true],[9],[0,\"Hello world\"],[10]],\"hasEval\":false}",
  meta: {
    scope: () => ({})
  }
})

const Class1Expression = _setComponentTemplate(class extends Component {}, {
  id: "pX6MO7j4",
  block: "{\"symbols\":[],\"statements\":[[7,\"h1\",true],[9],[0,\"Hello world\"],[10]],\"hasEval\":false}",
  meta: {
    scope: () => ({})
  }
});

class Class2Declaration extends Component {}

_setComponentTemplate(Class2Declaration, {
  id: "K+OefGFw",
  block: "{\"symbols\":[],\"statements\":[[7,\"h2\",true],[9],[0,\"\\n    Goodbye world\\n  \"],[10]],\"hasEval\":false}",
  meta: {
    scope: () => ({})
  }
})

const Class2Expression = _setComponentTemplate(class extends Component {}, {
  id: "y8Jq1bmF",
  block: "{\"symbols\":[],\"statements\":[[7,\"h2\",true],[9],[0,\"\\n    Goodbye world\"],[5,\"Class1Expression\",[],[[],[]],null],[0,\"\\n  \"],[10]],\"hasEval\":false}",
  meta: {
    scope: () => ({
      Class1Expression: Class1Expression
    })
  }
});