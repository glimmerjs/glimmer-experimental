import { DEBUG } from '@glimmer/env';
import { assert, deprecate } from '@glimmer/debug';
import { tracked } from '@glimmerx/tracking';
import Component, { hbs } from '@glimmerx/component';

if (DEBUG) {
  console.log('DEBUG!');
}

assert(true, 'is true');
deprecate('this is deprecated', false, { id: 'foo' });


export default class Test extends Component {
  @tracked bar = 123;
  static template = hbs`Hello World`;

  #cantTouchThis = 'mc hammer';

  #hammerTime() {}
}
