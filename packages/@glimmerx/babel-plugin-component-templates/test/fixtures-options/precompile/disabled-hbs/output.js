import { setComponentTemplate as _setComponentTemplate } from "@glimmerx/core";
import _Component from "@glimmerx/component";
import hbs from '@glimmer/inline-precompile';
import OtherComponent from './OtherComponent';
import YetAnotherComponent from './YetAnotherComponent';

const template1 = _setComponentTemplate(class extends _Component {}, (() => {
  const compiledTemplate = hbs`<h1>Hello world</h1><OtherComponent/>`;

  compiledTemplate.meta.scope = () => ({
    OtherComponent: OtherComponent
  });

  return compiledTemplate;
})());

const template2 = _setComponentTemplate(class extends _Component {}, (() => {
  const compiledTemplate = hbs`<YetAnotherComponent/>`;

  compiledTemplate.meta.scope = () => ({
    YetAnotherComponent: YetAnotherComponent
  });

  return compiledTemplate;
})());