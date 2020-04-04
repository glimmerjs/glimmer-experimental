import { setComponentTemplate as _setComponentTemplate } from "@glimmer/core";
import Component from '@glimmerx/component';
import MaybeComponent from './somewhere-else';
const unknownValue = null;
const maybeModifier = null;
export function foo() {
  return {};
}
export class MyComponent extends Component {}

_setComponentTemplate({
  id: "hNaOsjkR",
  block: "{\"symbols\":[],\"statements\":[[9,\"h1\",false],[3,0,0,[27,[26,0,\"ModifierHead\"],[]],null,null],[10],[1,1,0,0,\"Hello world \"],[1,0,0,0,[27,[26,1,\"AppendSingleId\"],[]]],[7,\"MySubComponent\",[],[[],[]],[[\"default\"],[{\"statements\":[[7,\"MaybeComponent\",[],[[],[]],null]],\"parameters\":[]}]]],[11]],\"hasEval\":false,\"upvars\":[\"maybeModifier\",\"unknownValue\"]}",
  meta: {
    scope: () => ({
      MaybeComponent: MaybeComponent,
      unknownValue: unknownValue,
      maybeModifier: maybeModifier
    })
  }
}, MyComponent);
