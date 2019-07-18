import Component from '@glimmer/component';
import { renderComponent } from '../';
import { withTemplate } from './utils';
const { module, test } = QUnit

module('Smoke test', () => {
  test('it renders a component', async (assert) => {
    const MyComponent = withTemplate(class extends Component {
    }, `<h1>Hello world</h1>`, () => ({}));

    const elem = document.getElementById('qunit-fixture')!;
    await renderComponent(MyComponent, elem);
    assert.strictEqual(elem.innerHTML, '<h1>Hello world</h1>', 'the template was rendered');
    assert.ok(true, 'rendered');
  });

  test('a component can render a nested component', async (assert) => {
    const OtherComponent = withTemplate(class extends Component {
    }, `Hello world`, () => ({}));

    const MyComponent = withTemplate(class extends Component {
    }, `<h1><OtherComponent /></h1>`, () => ({ OtherComponent }));

    const elem = document.getElementById('qunit-fixture')!;
    await renderComponent(MyComponent, elem);
    assert.strictEqual(elem.innerHTML, '<h1>Hello world</h1>', 'the template was rendered');
    assert.ok(true, 'rendered');
  });

  test('a component can render multiple nested components', async (assert) => {
    const Foo = withTemplate(class extends Component {
    }, `Foo`, () => ({}));

    const Bar = withTemplate(class extends Component {
    }, `Bar`, () => ({}));

    const OtherComponent = withTemplate(class extends Component {
    }, `Hello world <Foo /><Bar />`, () => ({ Foo, Bar }));

    const MyComponent = withTemplate(class extends Component {
    }, `<h1><OtherComponent /></h1>`, () => ({ OtherComponent }));

    const elem = document.getElementById('qunit-fixture')!;
    await renderComponent(MyComponent, elem);

    assert.strictEqual(elem.innerHTML, '<h1>Hello world FooBar</h1>', 'the template was rendered');
  });
});