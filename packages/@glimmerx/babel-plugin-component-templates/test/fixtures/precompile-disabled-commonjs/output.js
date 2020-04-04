"use strict";

var _core = require("@glimmer/core");

var _component = _interopRequireDefault(require("@glimmerx/component"));

var _OtherComponent = _interopRequireDefault(require("./OtherComponent"));

var _YetAnotherComponent = _interopRequireDefault(require("./YetAnotherComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MyComponent extends _component.default {}

(0, _core.setComponentTemplate)((0, _core.createTemplate)({
  OtherComponent: _OtherComponent.default
}, `<h1>Hello world</h1><OtherComponent/>`), MyComponent)
const MyComponentExpression = (0, _core.setComponentTemplate)((0, _core.createTemplate)({
  YetAnotherComponent: _YetAnotherComponent.default
}, `<YetAnotherComponent/>`), class extends _component.default {});
