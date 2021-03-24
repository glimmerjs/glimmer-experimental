export { service } from './src/decorator';

import { setOwner } from '@glimmerx/core';

export default class Service {
  constructor(owner: object) {
    setOwner(this, owner);
  }
}
