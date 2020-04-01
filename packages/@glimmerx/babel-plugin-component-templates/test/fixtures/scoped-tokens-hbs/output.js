import { templateOnlyComponent as _templateOnlyComponent } from "@glimmer/core";
import { setComponentTemplate as _setComponentTemplate } from "@glimmer/core";
import OtherComponent from './OtherComponent';
import PhantomComponent from './PhantomComponent';
import SecondPhantomComponent from './SecondPhantomComponent';

const hbsOnlyTemplate = _setComponentTemplate(_templateOnlyComponent(), {
  id: "ZciCU0lx",
  block: "{\"symbols\":[\"PhantomComponent\",\"SecondPhantomComponent\"],\"statements\":[[1,1,0,0,\"\\n\"],[9,\"h1\",true],[10],[1,1,0,0,\"Hello world\\n\"],[5,[27,[26,0,\"BlockHead\"],[]],null,null,[[\"default\"],[{\"statements\":[[1,1,0,0,\"        \"],[7,[27,[24,2],[]],[],[[],[]],null],[1,1,0,0,\"\\n        \"],[1,0,0,0,[27,[24,2],[]]],[1,1,0,0,\"\\n\"]],\"parameters\":[2]}]]],[1,1,0,0,\"    \"],[7,\"OtherComponent\",[],[[],[]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"\\n        \"],[7,[27,[24,1],[]],[],[[],[]],null],[1,1,0,0,\"\\n        \"],[1,0,0,0,[27,[24,1],[]]],[1,1,0,0,\"\\n    \"]],\"parameters\":[1]}]]],[1,1,0,0,\"\\n\"],[11]],\"hasEval\":false,\"upvars\":[\"OtherComponent\"]}",
  meta: {
    scope: () => ({
      OtherComponent: OtherComponent
    })
  }
});
