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
  "id": "jFBJ3iUu",
  "block": "[[[11,\"h1\"],[4,[32,0],null,null],[12],[1,\"Hello world \"],[1,[32,1]],[8,[32,2],null,null,null],[13]],[],false,[]]",
  "moduleName": "(unknown template module)",
  "scope": () => [maybeModifier, unknownValue, MaybeComponent],
  "isStrictMode": true
}, MyComponent);
