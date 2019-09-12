import Component from '@glimmerx/component';

import { renderComponent } from '..';
import { compileTemplate } from './utils';
import { setComponentTemplate } from '../src/setComponentTemplate';
import { helper } from '@glimmerx/helper';
import { service } from '@glimmerx/service';

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

  test('a component can render with helpers', async assert => {
    const myHelper = helper(([name]: [string], { greeting }: { greeting: string }) => {
      return `helper ${greeting} ${name}`;
    });

    class MyComponent extends Component {}
    setComponentTemplate(
      MyComponent,
      compileTemplate('<h1>{{myHelper "foo" greeting="Hello"}}</h1>', () => ({ myHelper }))
    );

    const elem = document.getElementById('qunit-fixture')!;
    await renderComponent(MyComponent, elem);
    assert.strictEqual(elem.innerHTML, '<h1>helper Hello foo</h1>', 'the template was rendered');
  });

  test('a component can inject services', async assert => {
    class LocaleService {
      get currentLocale() {
        return 'en_US';
      }
    }

    class MyComponent extends Component {
      @service locale: LocaleService;
      get myLocale() {
        return this.locale.currentLocale;
      }
    }

    setComponentTemplate(MyComponent, compileTemplate('<h1>{{this.myLocale}}</h1>'));

    const elem = document.getElementById('qunit-fixture')!;
    await renderComponent(MyComponent, {
      element: elem!,
      services: {
        locale: new LocaleService(),
      },
    });
    assert.strictEqual(elem.innerHTML, '<h1>en_US</h1>');
  });

  test('a helper can inject services', async assert => {
    class LocaleService {
      get currentLocale() {
        return 'en_US';
      }
    }

    const myHelper = helper((args, hash, { services }) => {
      const localeService = services!.locale as LocaleService;
      return `The locale is ${localeService.currentLocale}`;
    });

    class MyComponent extends Component {}
    setComponentTemplate(
      MyComponent,
      compileTemplate('<h1>{{myHelper}}</h1>', () => ({ myHelper }))
    );

    const elem = document.getElementById('qunit-fixture')!;
    await renderComponent(MyComponent, {
      element: elem!,
      services: {
        locale: new LocaleService(),
      },
    });
    assert.strictEqual(elem.innerHTML, '<h1>The locale is en_US</h1>');
  });
});
