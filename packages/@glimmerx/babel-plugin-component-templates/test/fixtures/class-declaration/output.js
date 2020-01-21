import { setComponentTemplate as _setComponentTemplate } from "@glimmerx/core";
import Component from '@glimmerx/component';
import OtherComponent from './OtherComponent';
const unknownValue = null;
const MaybeComponent = null;
const maybeModifier = null;

class MyComponent extends Component {}

_setComponentTemplate(MyComponent, {
  id: "O7ZGAk2s",
  block: "{\"symbols\":[],\"statements\":[[7,\"h1\",false],[3,\"maybeModifier\",null,null],[9],[0,\"Hello world \"],[1,[23,\"unknownValue\"],false],[5,\"MySubComponent\",[],[[],[]],[[\"default\"],[{\"statements\":[[5,\"MaybeComponent\",[],[[],[]],null]],\"parameters\":[]}]]],[10]],\"hasEval\":false}",
  meta: {
    scope: () => ({
      unknownValue: unknownValue,
      MaybeComponent: MaybeComponent,
      maybeModifier: maybeModifier
    })
  }
})