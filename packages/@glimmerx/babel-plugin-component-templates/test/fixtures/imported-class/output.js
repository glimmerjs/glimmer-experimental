import { setComponentTemplate as _setComponentTemplate } from "@glimmerx/core";
import Component, { hbs } from '@glimmerx/component';
import Button from './Button';
export default class MyComponent extends Component {}

_setComponentTemplate(MyComponent, {
  id: "+PEr61nc",
  block: "{\"symbols\":[],\"statements\":[[0,\"\\n      \"],[7,\"h1\",true],[9],[0,\"Hello world!\"],[10],[0,\"\\n      \"],[5,\"Button\",[],[[],[]],null],[0,\"\\n    \"]],\"hasEval\":false}",
  meta: {
    scope: () => ({
      Component,
      hbs,
      Button,
      MyComponent
    })
  }
});