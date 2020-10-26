import { templateOnlyComponent as _templateOnlyComponent } from "@glimmer/core";
import { setComponentTemplate as _setComponentTemplate } from "@glimmer/core";
import { renderComponent } from '@glimmer/core';
import IamGlimmerComponent from '@glimmerx/component';
renderComponent(_setComponentTemplate({
  id: "2HWpeZsH",
  block: "{\"symbols\":[\"@name\"],\"statements\":[[10,\"h1\"],[12],[2,\"Hello \"],[1,[32,1]],[13]],\"hasEval\":false,\"upvars\":[]}",
  meta: {
    scope: () => ({})
  }
}, _templateOnlyComponent()), {
  args: {
    name: 'Abhishek'
  },
  element: document.body
});
