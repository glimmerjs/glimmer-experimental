import { TOComponent as _TOComponent } from "@glimmerx/some-component-path";
import { dangerouslySetComponentTemplate as _dangerouslySetComponentTemplate } from "@glimmerx/other-package";
import Component from '@glimmerx/component';

class Class1Declaration extends Component {}

_dangerouslySetComponentTemplate({
  id: "9bMgfwbA",
  block: "{\"symbols\":[],\"statements\":[[10,\"h1\"],[12],[2,\"Hello world\"],[13]],\"hasEval\":false,\"upvars\":[]}",
  meta: {
    scope: () => ({})
  }
}, Class1Declaration)

const Class1Expression = _dangerouslySetComponentTemplate({
  id: "9bMgfwbA",
  block: "{\"symbols\":[],\"statements\":[[10,\"h1\"],[12],[2,\"Hello world\"],[13]],\"hasEval\":false,\"upvars\":[]}",
  meta: {
    scope: () => ({})
  }
}, class extends Component {});

class Class2Declaration extends Component {}

_dangerouslySetComponentTemplate({
  id: "+VA0BbEt",
  block: "{\"symbols\":[],\"statements\":[[10,\"h2\"],[12],[2,\"\\n    Goodbye world\\n  \"],[13]],\"hasEval\":false,\"upvars\":[]}",
  meta: {
    scope: () => ({})
  }
}, Class2Declaration)

const Class2Expression = _dangerouslySetComponentTemplate({
  id: "uIjvs0yQ",
  block: "{\"symbols\":[],\"statements\":[[10,\"h2\"],[12],[2,\"\\n    Goodbye world\"],[8,\"Class2Declaration\",[],[[],[]],null],[2,\"\\n  \"],[13]],\"hasEval\":false,\"upvars\":[]}",
  meta: {
    scope: () => ({
      Class2Declaration: Class2Declaration
    })
  }
}, class extends Component {});

const TOComponent = _dangerouslySetComponentTemplate({
  id: "tsv3hFVE",
  block: "{\"symbols\":[],\"statements\":[[10,\"h3\"],[12],[2,\"Hello again world\"],[8,\"Class2Expression\",[],[[],[]],null],[13]],\"hasEval\":false,\"upvars\":[]}",
  meta: {
    scope: () => ({
      Class2Expression: Class2Expression
    })
  }
}, _TOComponent());
