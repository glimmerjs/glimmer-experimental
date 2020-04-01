import { createTemplate as _createTemplate } from "@glimmer/core";
import { setComponentTemplate as _setComponentTemplate } from "@glimmer/core";
import Component from '@glimmerx/component';
import OtherComponent from './OtherComponent';
import YetAnotherComponent from './YetAnotherComponent';

class MyComponent extends Component {}

_setComponentTemplate(MyComponent, _createTemplate({
  OtherComponent: OtherComponent
}, `<h1>Hello world</h1><OtherComponent/>`))

const MyComponentExpression = _setComponentTemplate(class extends Component {}, _createTemplate({
  YetAnotherComponent: YetAnotherComponent
}, `<YetAnotherComponent/>`));
