import { templateOnlyComponent as _templateOnlyComponent } from "@glimmer/core";
import { setComponentTemplate as _setComponentTemplate } from "@glimmer/core";
import OtherComponent from './OtherComponent';
import PhantomComponent from './PhantomComponent';
import SecondPhantomComponent from './SecondPhantomComponent';

const hbsOnlyTemplate = _setComponentTemplate({
  "id": "yGo9zi+C",
  "block": "[[[1,\"\\n\"],[10,\"h1\"],[12],[1,\"Hello world\\n\"],[6,[32,0],null,null,[[\"default\"],[[[[1,\"        \"],[8,[30,1],null,null,null],[1,\"\\n        \"],[1,[30,1]],[1,\"\\n\"]],[1]]]]],[1,\"    \"],[8,[32,0],null,null,[[\"default\"],[[[[1,\"\\n        \"],[8,[30,2],null,null,null],[1,\"\\n        \"],[1,[30,2]],[1,\"\\n    \"]],[2]]]]],[1,\"\\n\"],[13]],[\"SecondPhantomComponent\",\"PhantomComponent\"],false,[]]",
  "moduleName": "(unknown template module)",
  "scope": () => [OtherComponent],
  "isStrictMode": true
}, _templateOnlyComponent());
