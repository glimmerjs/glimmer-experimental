import { templateOnlyComponent as _templateOnlyComponent } from "@glimmer/core";
import { setComponentTemplate as _setComponentTemplate } from "@glimmer/core";
import { renderComponent } from '@glimmer/core';
import IamGlimmerComponent from '@glimmerx/component';
renderComponent(_setComponentTemplate({
  id: "wr1/fM82",
  block: "{\"symbols\":[\"@name\"],\"statements\":[[9,\"h1\",true],[10],[1,1,0,0,\"Hello \"],[1,0,0,0,[27,[24,1],[]]],[11]],\"hasEval\":false,\"upvars\":[]}",
  meta: {
    scope: () => ({})
  }
}, _templateOnlyComponent()), {
  args: {
    name: 'Abhishek'
  },
  element: document.body
});
