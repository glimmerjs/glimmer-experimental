import { TOComponent as _TOComponent } from "@glimmerx/some-component-path";
import { dangerouslySetComponentTemplate as _dangerouslySetComponentTemplate } from "@glimmerx/other-package";
import Component from '@glimmerx/component';

class Class1Declaration extends Component {}

_dangerouslySetComponentTemplate(Class1Declaration, {
  id: "hzw7dJc0",
  block: "{\"symbols\":[],\"statements\":[[9,\"h1\",true],[10],[1,1,0,0,\"Hello world\"],[11]],\"hasEval\":false,\"upvars\":[]}",
  meta: {
    scope: () => ({})
  }
})

const Class1Expression = _dangerouslySetComponentTemplate(class extends Component {}, {
  id: "hzw7dJc0",
  block: "{\"symbols\":[],\"statements\":[[9,\"h1\",true],[10],[1,1,0,0,\"Hello world\"],[11]],\"hasEval\":false,\"upvars\":[]}",
  meta: {
    scope: () => ({})
  }
});

class Class2Declaration extends Component {}

_dangerouslySetComponentTemplate(Class2Declaration, {
  id: "85zTPBgs",
  block: "{\"symbols\":[],\"statements\":[[9,\"h2\",true],[10],[1,1,0,0,\"\\n    Goodbye world\\n  \"],[11]],\"hasEval\":false,\"upvars\":[]}",
  meta: {
    scope: () => ({})
  }
})

const Class2Expression = _dangerouslySetComponentTemplate(class extends Component {}, {
  id: "64616wXU",
  block: "{\"symbols\":[],\"statements\":[[9,\"h2\",true],[10],[1,1,0,0,\"\\n    Goodbye world\"],[7,\"Class2Declaration\",[],[[],[]],null],[1,1,0,0,\"\\n  \"],[11]],\"hasEval\":false,\"upvars\":[]}",
  meta: {
    scope: () => ({
      Class2Declaration: Class2Declaration
    })
  }
});

const TOComponent = _dangerouslySetComponentTemplate(_TOComponent(), {
  id: "iXWF5ni9",
  block: "{\"symbols\":[],\"statements\":[[9,\"h3\",true],[10],[1,1,0,0,\"Hello again world\"],[7,\"Class2Expression\",[],[[],[]],null],[11]],\"hasEval\":false,\"upvars\":[]}",
  meta: {
    scope: () => ({
      Class2Expression: Class2Expression
    })
  }
});
