import { createTemplate as _createTemplate } from "@glimmer/core";
import { setComponentTemplate as _setComponentTemplate } from "@glimmer/core";
import { t as _t } from "t-helper";
import Component from '@glimmerx/component';

const MyComponent = _setComponentTemplate(class extends Component {}, _createTemplate({
  _t: _t
}, `<h1>{{_t "foo"}}</h1>`));
