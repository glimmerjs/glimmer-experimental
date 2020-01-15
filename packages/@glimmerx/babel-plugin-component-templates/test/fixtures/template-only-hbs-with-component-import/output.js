import { setComponentTemplate as _setComponentTemplate } from "@glimmerx/core";
import { renderComponent } from '@glimmerx/core';
import IamGlimmerComponent, { hbs } from '@glimmerx/component';
renderComponent(_setComponentTemplate(class extends IamGlimmerComponent {}, {
  id: "/eBDGAqT",
  block: "{\"symbols\":[\"@name\"],\"statements\":[[7,\"h1\",true],[9],[0,\"Hello \"],[1,[24,1,[]],false],[10]],\"hasEval\":false}",
  meta: {
    scope: () => ({})
  }
}), {
  args: {
    name: 'Abhishek'
  },
  element: document.body
});