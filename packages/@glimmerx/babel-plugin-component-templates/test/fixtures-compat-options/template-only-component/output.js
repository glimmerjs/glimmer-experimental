import _hbs from "glimmer-inline-precompile";
import { setComponentTemplate as _setComponentTemplate } from "@glimmerx/core";
import _Component from "@glimmerx/component";
import { t as _t } from "t-helper";
import OtherComponent from './OtherComponent';
import YetAnotherComponent from './YetAnotherComponent';

const template1 = _setComponentTemplate(class extends _Component {}, (() => {
  const compiledTemplate = _hbs`{{_t "bar"}}<h1>Hello world</h1><OtherComponent/>`;

  compiledTemplate.meta.scope = () => ({
    OtherComponent: OtherComponent,
    _t: _t
  });

  return compiledTemplate;
})());

const template2 = _setComponentTemplate(class extends _Component {}, (() => {
  const compiledTemplate = _hbs`{{_t "foo"}}<YetAnotherComponent/>`;

  compiledTemplate.meta.scope = () => ({
    YetAnotherComponent: YetAnotherComponent,
    _t: _t
  });

  return compiledTemplate;
})());