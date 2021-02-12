export { service } from './src/decorator';

import { setOwner } from '@glimmerx/core';

export default class Service {
  constructor(owner) {
    setOwner(this, owner);
  }
}
