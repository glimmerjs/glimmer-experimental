import { createTemplate as _createTemplate } from "@glimmer/core";
import { templateOnlyComponent as _templateOnlyComponent } from "@glimmer/core";
import { setComponentTemplate as _setComponentTemplate } from "@glimmer/core";
import OtherComponent from './OtherComponent';
import YetAnotherComponent from './YetAnotherComponent';

const template1 = _setComponentTemplate(_createTemplate({
  OtherComponent: OtherComponent
}, `<h1>Hello world</h1><OtherComponent/>`), _templateOnlyComponent());

const template2 = _setComponentTemplate(_createTemplate({
  YetAnotherComponent: YetAnotherComponent
}, `<YetAnotherComponent/>`), _templateOnlyComponent());
