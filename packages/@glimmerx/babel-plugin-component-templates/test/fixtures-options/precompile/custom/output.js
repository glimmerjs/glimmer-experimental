import { setComponentTemplate as _setComponentTemplate } from "@glimmer/core";
import Component from '@glimmerx/component';

class MyComponent extends Component {}

_setComponentTemplate(CUSTOM_COMPILER("{{bad}}<h1>Hello world</h1>"), MyComponent)
