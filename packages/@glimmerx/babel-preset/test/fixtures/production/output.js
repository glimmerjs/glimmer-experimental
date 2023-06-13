var _class, _descriptor, _cantTouchThis, _hammerTime;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

import { setComponentTemplate as _setComponentTemplate } from "@glimmer/core";
import { createTemplateFactory as _createTemplateFactory } from "@glimmer/core";
import { assert, deprecate } from '@glimmer/debug';
import { tracked } from '@glimmerx/tracking';
import Component from '@glimmerx/component';

if (false
/* DEBUG */
) {
  console.log('DEBUG!');
}

(false && assert(true, 'is true'));
(false && !(false) && deprecate('this is deprecated', false, {
  id: 'foo'
}));

let Test = _setComponentTemplate(_createTemplateFactory(
/*
  Hello World
*/
{
  "id": null,
  "block": "[[[1,\"Hello World\"]],[],false,[]]",
  "moduleName": "(unknown template module)",
  "isStrictMode": true
}), (_class = (_cantTouchThis = /*#__PURE__*/new WeakMap(), _hammerTime = /*#__PURE__*/new WeakSet(), class Test extends Component {
  constructor(...args) {
    super(...args);

    _classPrivateMethodInitSpec(this, _hammerTime);

    _initializerDefineProperty(this, "bar", _descriptor, this);

    _classPrivateFieldInitSpec(this, _cantTouchThis, {
      writable: true,
      value: 'mc hammer'
    });
  }

}), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "bar", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 123;
  }
})), _class));

function _hammerTime2() {}

export { Test as default };
