import * as _core from '@glimmer/core';
import * as _xCore from '@glimmerx/core';
import * as _xHelper from '@glimmerx/helper';
import * as _xModifier from '@glimmerx/modifier';
import * as _xService from '@glimmerx/service';
import Component, * as _xComponent from '@glimmerx/component';
import compile from './compile';

const modules = {
  '@glimmer/core': _core,
  '@glimmerx/core': _xCore,
  '@glimmerx/component': _xComponent,
  '@glimmerx/helper': _xHelper,
  '@glimmerx/modifier': _xModifier,
  '@glimmerx/service': _xService,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function require(moduleName: keyof typeof modules): unknown {
  return modules[moduleName];
}

export function evalSnippet(
  code: string
): { default: Component; services?: { [key: string]: unknown } } {
  const compiled = compile(code);

  const exports = {};

  eval(compiled.code);

  return exports as { default: Component; services?: { [key: string]: unknown } };
}
