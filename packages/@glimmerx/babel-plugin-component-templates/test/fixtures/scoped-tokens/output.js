import { setComponentTemplate as _setComponentTemplate } from "@glimmer/core";
import Component from '@glimmerx/component';
import OtherComponent from './OtherComponent';
import PhantomComponent from './PhantomComponent';
import SecondPhantomComponent from './SecondPhantomComponent';

class MyComponent extends Component {}

_setComponentTemplate({
  id: "gcTTvmeO",
  block: "{\"symbols\":[\"PhantomComponent\",\"SecondPhantomComponent\"],\"statements\":[[2,\"\\n    \"],[10,\"h1\"],[12],[2,\"Hello world \\n\"],[6,[37,0],null,null,[[\"default\"],[{\"statements\":[[2,\"            \"],[8,[32,2],[],[[],[]],null],[2,\"\\n            \"],[1,[32,2]],[2,\"\\n\"]],\"parameters\":[2]}]]],[2,\"        \"],[8,\"OtherComponent\",[],[[],[]],[[\"default\"],[{\"statements\":[[2,\"\\n            \"],[8,[32,1],[],[[],[]],null],[2,\" \\n            \"],[1,[32,1]],[2,\"\\n        \"]],\"parameters\":[1]}]]],[2,\"\\n    \"],[13]],\"hasEval\":false,\"upvars\":[\"OtherComponent\"]}",
  meta: {
    scope: () => ({
      OtherComponent: OtherComponent
    })
  }
}, MyComponent)
