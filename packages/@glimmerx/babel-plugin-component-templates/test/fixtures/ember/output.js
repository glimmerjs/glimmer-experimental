var _setComponentTemplate = Ember._setComponentTemplate;
import Component from '@glimmerx/component';
import OtherComponent from './OtherComponent';
const unknownValue = null;
const MaybeComponent = null;
const maybeModifier = null;

class MyComponent extends Component {}

_setComponentTemplate({
  id: "fmofmZv3",
  block: "{\"symbols\":[],\"statements\":[[11,\"h1\"],[4,[38,0],null,null],[12],[2,\"Hello world \"],[1,[34,1]],[8,\"MySubComponent\",[],[[],[]],[[\"default\"],[{\"statements\":[[8,\"MaybeComponent\",[],[[],[]],null]],\"parameters\":[]}]]],[13]],\"hasEval\":false,\"upvars\":[\"maybeModifier\",\"unknownValue\"]}",
  meta: {
    scope: () => ({
      maybeModifier: maybeModifier,
      unknownValue: unknownValue,
      MaybeComponent: MaybeComponent
    })
  }
}, MyComponent)
