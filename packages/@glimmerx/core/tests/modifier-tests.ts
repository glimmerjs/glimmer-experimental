const { module, test } = QUnit;

import { on, action } from '@glimmerx/modifier';
import Component, { tracked, hbs } from '@glimmerx/component';
import { renderComponent, didRender } from '..';
import { Modifier } from '..';

module('Modifier Tests', () => {
  test('Supports the on modifier', async (assert) => {
    class MyComponent extends Component {
      static template = hbs`
        <button {{on "click" this.incrementCounter}}>Count: {{this.count}}</button>
      `;
      @tracked count = 0;

      @action
      incrementCounter() {
        this.count++;
      }
    }

    const element = document.getElementById('qunit-fixture')!;

    await renderComponent(MyComponent, element);

    assert.strictEqual(
      element.innerHTML.trim(),
      `<button>Count: 0</button>`,
      'the component was rendered'
    );

    element.querySelector('button')!.click();
    await didRender();
    assert.strictEqual(
      element.innerHTML.trim(),
      `<button>Count: 1</button>`,
      'the component was rerendered'
    );
  });

  test('supports simple functions as modifiers', async (assert) => {
    assert.expect(3);

    function myModifier(element: Element, arg1: string, arg2: string) {
      assert.equal(arg1, 'foo');
      assert.equal(arg2, 'bar');
      assert.ok(element.classList.contains('test-element'));
    }

    class MyComponent extends Component {
      static template = hbs`<div {{myModifier "foo" "bar"}} class="test-element"></div>`;
    }

    const element = document.getElementById('qunit-fixture')!;
    await renderComponent(MyComponent, element);
  });

  test('supports simple class as modifiers', async (assert) => {
    assert.expect(4);

    class myModifier extends Modifier {
      didInstall() {
        assert.equal(this.args.positional[0], 'foo');
        assert.equal(this.args.positional[1], 'bar');
        assert.equal(this.args.named.baz, 'qux');
        assert.ok(this.element.classList.contains('test-element'));
      }
    }

    class MyComponent extends Component {
      static template = hbs`<div {{myModifier "foo" "bar" baz="qux"}} class="test-element"></div>`;
    }

    const element = document.getElementById('qunit-fixture')!;
    await renderComponent(MyComponent, element);
  });
});
