"use strict";

var _glimmerInlinePrecompile = _interopRequireDefault(require("glimmer-inline-precompile"));

var _core = require("@glimmerx/core");

var _component = _interopRequireDefault(require("@glimmerx/component"));

var _OtherComponent = _interopRequireDefault(require("./OtherComponent"));

var _YetAnotherComponent = _interopRequireDefault(require("./YetAnotherComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MyComponent extends _component.default {}

(0, _core.setComponentTemplate)(MyComponent, (() => {
  const compiledTemplate = (0, _glimmerInlinePrecompile.default)`<h1>Hello world</h1><OtherComponent/>`;

  compiledTemplate.meta.scope = () => ({
    OtherComponent: _OtherComponent.default
  });

  return compiledTemplate;
})())
const MyComponentExpression = (0, _core.setComponentTemplate)(class extends _component.default {}, (() => {
  const compiledTemplate = (0, _glimmerInlinePrecompile.default)`<YetAnotherComponent/>`;

  compiledTemplate.meta.scope = () => ({
    YetAnotherComponent: _YetAnotherComponent.default
  });

  return compiledTemplate;
})());
