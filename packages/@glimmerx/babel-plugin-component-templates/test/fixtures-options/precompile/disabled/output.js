import _hbs from "glimmer-inline-precompile";
import { setComponentTemplate as _setComponentTemplate } from "@glimmerx/core";
import OtherComponent from './OtherComponent';
import YetAnotherComponent from './YetAnotherComponent';

class MyComponent extends Component {}

_setComponentTemplate(MyComponent, (() => {
  const compiledTemplate = _hbs`<h1>Hello world</h1><OtherComponent/>`;

  compiledTemplate.meta.scope = () => ({
    OtherComponent: OtherComponent
  });

  return compiledTemplate;
})())

const MyComponentExpression = _setComponentTemplate(class extends Component {}, (() => {
  const compiledTemplate = _hbs`<YetAnotherComponent/>`;

  compiledTemplate.meta.scope = () => ({
    YetAnotherComponent: YetAnotherComponent
  });

  return compiledTemplate;
})());