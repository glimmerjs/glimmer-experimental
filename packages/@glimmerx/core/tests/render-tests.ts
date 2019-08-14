import Component from '@glimmerx/component';

import { renderComponent } from '..';
import { compileTemplate } from './utils';
import { setComponentTemplate } from '../src/setComponentTemplate';

const { module, test } = QUnit;

module('rendering', () => {
  test('it renders a component', async assert => {
    class MyComponent extends Component {}

    setComponentTemplate(MyComponent, compileTemplate(`<h1>Hello world</h1>`));

    const elem = document.getElementById('qunit-fixture')!;
    await renderComponent(MyComponent, elem);
    assert.strictEqual(elem.innerHTML, '<h1>Hello world</h1>', 'the template was rendered');
    assert.ok(true, 'rendered');
  });

  test('a component can render a nested component', async assert => {
    class OtherComponent extends Component {}

    setComponentTemplate(OtherComponent, compileTemplate(`Hello world`));

    class MyComponent extends Component {}
    setComponentTemplate(
      MyComponent,
      compileTemplate(`<h1><OtherComponent /></h1>`, () => ({ OtherComponent }))
    );

    const elem = document.getElementById('qunit-fixture')!;
    await renderComponent(MyComponent, elem);
    assert.strictEqual(elem.innerHTML, '<h1>Hello world</h1>', 'the template was rendered');
    assert.ok(true, 'rendered');
  });

  test('a component can render multiple nested components', async assert => {
    class Foo extends Component {}
    setComponentTemplate(Foo, compileTemplate(`Foo`));

    class Bar extends Component {}
    setComponentTemplate(Bar, compileTemplate(`Bar`));

    class OtherComponent extends Component {}
    setComponentTemplate(
      OtherComponent,
      compileTemplate(`Hello world <Foo /><Bar />`, () => ({ Foo, Bar }))
    );

    class MyComponent extends Component {}
    setComponentTemplate(
      MyComponent,
      compileTemplate(`<h1><OtherComponent /></h1>`, () => ({ OtherComponent }))
    );

    const elem = document.getElementById('qunit-fixture')!;
    await renderComponent(MyComponent, elem);

    assert.strictEqual(elem.innerHTML, '<h1>Hello world FooBar</h1>', 'the template was rendered');
  });
});
