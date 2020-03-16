import _hbs from "glimmer-inline-precompile";
import { setComponentTemplate as _setComponentTemplate } from "@glimmerx/core";
import { t as _t } from "t-helper";
import Component from '@glimmerx/component';

const MyComponent = _setComponentTemplate(class extends Component {}, (() => {
  const compiledTemplate = _hbs`<h1>{{_t "foo"}}</h1>`;

  compiledTemplate.meta.scope = () => ({
    _t: _t
  });

  return compiledTemplate;
})());