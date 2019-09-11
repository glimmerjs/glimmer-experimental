import { dangerouslySetComponentTemplate as _dangerouslySetComponentTemplate } from "@glimmerx/other-package";

class Class1Declaration extends Component {}

_dangerouslySetComponentTemplate(Class1Declaration, {
  id: "pX6MO7j4",
  block: "{\"symbols\":[],\"statements\":[[7,\"h1\",true],[9],[0,\"Hello world\"],[10]],\"hasEval\":false}",
  meta: {
    scope: () => ({})
  }
})

const Class1Expression = _dangerouslySetComponentTemplate(class extends Component {}, {
  id: "pX6MO7j4",
  block: "{\"symbols\":[],\"statements\":[[7,\"h1\",true],[9],[0,\"Hello world\"],[10]],\"hasEval\":false}",
  meta: {
    scope: () => ({})
  }
});

class Class2Declaration extends Component {}

_dangerouslySetComponentTemplate(Class2Declaration, {
  id: "K+OefGFw",
  block: "{\"symbols\":[],\"statements\":[[7,\"h2\",true],[9],[0,\"\\n    Goodbye world\\n  \"],[10]],\"hasEval\":false}",
  meta: {
    scope: () => ({})
  }
})

const Class2Expression = _dangerouslySetComponentTemplate(class extends Component {}, {
  id: "DRF9keh2",
  block: "{\"symbols\":[],\"statements\":[[7,\"h2\",true],[9],[0,\"\\n    Goodbye world\"],[5,\"Class2Declaration\",[],[[],[]],null],[0,\"\\n  \"],[10]],\"hasEval\":false}",
  meta: {
    scope: () => ({
      Class2Declaration: Class2Declaration
    })
  }
});