var _setComponentTemplate = Ember._setComponentTemplate;
import Component from '@glimmerx/component';
import OtherComponent from './OtherComponent';
const unknownValue = null;
const MaybeComponent = null;
const maybeModifier = null;

class MyComponent extends Component {}

_setComponentTemplate({
  id: "hNaOsjkR",
  block: "{\"symbols\":[],\"statements\":[[9,\"h1\",false],[3,0,0,[27,[26,0,\"ModifierHead\"],[]],null,null],[10],[1,1,0,0,\"Hello world \"],[1,0,0,0,[27,[26,1,\"AppendSingleId\"],[]]],[7,\"MySubComponent\",[],[[],[]],[[\"default\"],[{\"statements\":[[7,\"MaybeComponent\",[],[[],[]],null]],\"parameters\":[]}]]],[11]],\"hasEval\":false,\"upvars\":[\"maybeModifier\",\"unknownValue\"]}",
  meta: {
    scope: () => ({
      unknownValue: unknownValue,
      MaybeComponent: MaybeComponent,
      maybeModifier: maybeModifier
    })
  }
}, MyComponent)
