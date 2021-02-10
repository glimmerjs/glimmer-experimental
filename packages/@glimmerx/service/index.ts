export { service } from './src/decorator';

import { OWNER } from '@glimmer/owner';

export default class Service {
  constructor(owner) {
    this[OWNER] = owner;
  }
}
