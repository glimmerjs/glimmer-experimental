import { setComponentTemplate as _setComponentTemplate } from "@glimmerx/core";
import _Component from "@glimmerx/component";
import { hbs } from '@glimmerx/component';
import OtherComponent from './OtherComponent';
import PhantomComponent from './PhantomComponent';
import SecondPhantomComponent from './SecondPhantomComponent';

const hbsOnlyTemplate = _setComponentTemplate(class extends _Component {}, {
  id: "tX2UUCNd",
  block: "{\"symbols\":[\"PhantomComponent\",\"SecondPhantomComponent\"],\"statements\":[[0,\"\\n\"],[7,\"h1\",true],[9],[0,\"Hello world\\n\"],[4,\"OtherComponent\",null,null,[[\"default\"],[{\"statements\":[[0,\"        \"],[6,[24,2,[]],[],[[],[]],null],[0,\"\\n        \"],[1,[24,2,[]],false],[0,\"\\n\"]],\"parameters\":[2]}]]],[0,\"    \"],[5,\"OtherComponent\",[],[[],[]],[[\"default\"],[{\"statements\":[[0,\"\\n        \"],[6,[24,1,[]],[],[[],[]],null],[0,\"\\n        \"],[1,[24,1,[]],false],[0,\"\\n    \"]],\"parameters\":[1]}]]],[0,\"\\n\"],[10]],\"hasEval\":false}",
  meta: {
    scope: () => ({
      OtherComponent: OtherComponent
    })
  }
});