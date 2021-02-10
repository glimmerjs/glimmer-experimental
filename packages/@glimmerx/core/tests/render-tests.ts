import Component, { tracked, hbs } from '@glimmerx/component';

import { helper } from '@glimmerx/helper';
import Service, { service } from '@glimmerx/service';
import { on, action } from '@glimmerx/modifier';
import { Owner } from '..';
import LazyOwner from '../../ssr/tests/lib/LazyOwner';

const { module, test } = QUnit;

export interface Constructor<T> {
  new (owner: object, args: object): T;
}

export default function renderTests(
  moduleName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (component: Constructor<Component>, options?: any) => Promise<string>
) {
  module(`${moduleName} rendering`, () => {
    test('it renders a component', async (assert) => {
      class MyComponent extends Component {
        static template = hbs`<h1>Hello world</h1>`;
      }

      const html = await render(MyComponent);
      assert.strictEqual(html, '<h1>Hello world</h1>', 'the template was rendered');
      assert.ok(true, 'rendered');
    });

    test('a component can render a nested component', async (assert) => {
      class OtherComponent extends Component {
        static template = hbs`Hello world`;
      }

      class MyComponent extends Component {
        static template = hbs`<h1><OtherComponent /></h1>`;
      }

      const html = await render(MyComponent);
      assert.strictEqual(html, '<h1>Hello world</h1>', 'the template was rendered');
      assert.ok(true, 'rendered');
    });

    test('a component can render multiple nested components', async (assert) => {
      class Foo extends Component {
        static template = hbs`Foo`;
      }

      class Bar extends Component {
        static template = hbs`Bar`;
      }

      class OtherComponent extends Component {
        static template = hbs`Hello world <Foo /><Bar />`;
      }

      class MyComponent extends Component {
        static template = hbs`<h1><OtherComponent /></h1>`;
      }

      const html = await render(MyComponent);

      assert.strictEqual(html, '<h1>Hello world FooBar</h1>', 'the template was rendered');
    });

    test('a component can render with helpers', async (assert) => {
      const myHelper = helper(([name]: string, { greeting }: { greeting: string }) => {
        return `helper ${greeting} ${name}`;
      });

      class MyComponent extends Component {
        static template = hbs`<h1>{{myHelper "foo" greeting="Hello"}}</h1>`;
      }

      const html = await render(MyComponent);
      assert.strictEqual(html, '<h1>helper Hello foo</h1>', 'the template was rendered');
    });

    test('a component can render with args', async (assert) => {
      class MyComponent extends Component {
        static template = hbs`<h1>{{@say}}</h1>`;
      }

      const renderOptions = {
        args: {
          say: 'Hello Dolly!',
        },
      };

      const html = await render(MyComponent, renderOptions);
      assert.strictEqual(
        html,
        '<h1>Hello Dolly!</h1>',
        'the component is rendered with passed in args'
      );
    });

    test('a component can inject services', async (assert) => {
      class LocaleService {
        get currentLocale() {
          return 'en_US';
        }
      }

      class MyComponent extends Component {
        static template = hbs`<h1>{{this.myLocale}}</h1>`;

        @service locale: LocaleService;
        get myLocale() {
          return this.locale.currentLocale;
        }
      }

      const html = await render(MyComponent, {
        services: {
          locale: new LocaleService(),
        },
      });
      assert.strictEqual(html, '<h1>en_US</h1>');
    });

    test('a helper can inject services', async (assert) => {
      class LocaleService {
        get currentLocale() {
          return 'en_US';
        }
      }

      const myHelper = helper((_args: unknown, _hash: unknown, { services }) => {
        const localeService = services!.locale as LocaleService;
        return `The locale is ${localeService.currentLocale}`;
      });

      class MyComponent extends Component {
        static template = hbs`<h1>{{myHelper}}</h1>`;
      }

      const html = await render(MyComponent, {
        services: {
          locale: new LocaleService(),
        },
      });
      assert.strictEqual(html, '<h1>The locale is en_US</h1>');
    });

    test('a component can be rendered more than once', async (assert) => {
      class MyComponent extends Component {
        static template = hbs`<h1>Bump</h1>`;
      }

      let html = await render(MyComponent);
      assert.strictEqual(html, '<h1>Bump</h1>', 'the component rendered');
      assert.ok(true, 'rendered');

      html = await render(MyComponent);
      assert.strictEqual(html, '<h1>Bump</h1>', 'the component was rendered again');
      assert.ok(true, 'rendered');
    });

    test('a component can use modifiers', async (assert) => {
      class MyComponent extends Component {
        static template = hbs`<button {{on "click" this.incrementCounter}}>Count: {{this.count}}</button>`;

        @tracked count = 0;

        @action
        incrementCounter() {
          this.count++;
        }
      }

      const html = await render(MyComponent);
      assert.strictEqual(html, `<button>Count: 0</button>`, 'the component was rendered');
    });

    test('supports functions as simple helpers', async (assert) => {
      function upperCase(str: string) {
        return str.toUpperCase();
      }

      class MyComponent extends Component {
        static template = hbs`Hello {{upperCase "test"}}`;
      }

      const html = await render(MyComponent);
      assert.strictEqual(html, 'Hello TEST', 'the component rendered');
    });

    test('options.owner can render', async (assert) => {
      const owner = new Owner({});

      class MyComponent extends Component {
        static template = hbs`<h1>Hello World</h1>`;
      }

      const html = await render(MyComponent, {
        owner,
      });

      assert.strictEqual(html, '<h1>Hello World</h1>');
    });

    test('options.owner can define services', async (assert) => {
      class LocaleService {
        get currentLocale() {
          return 'en_US';
        }
      }

      class MyComponent extends Component {
        static template = hbs`<h1>{{this.myLocale}}</h1>`;

        @service locale: LocaleService;
        get myLocale() {
          return this.locale.currentLocale;
        }
      }

      const owner = new Owner({
        locale: new LocaleService(),
      });

      const html = await render(MyComponent, {
        owner,
      });

      assert.strictEqual(html, '<h1>en_US</h1>');
    });

    test('options.owner when present; ignores options.services', async (assert) => {
      class LocaleService {
        get currentLocale() {
          return 'en_US';
        }
      }

      class InvalidLocaleService extends LocaleService {
        get currentLocale() {
          return 'xx_YY';
        }
      }

      class MyComponent extends Component {
        static template = hbs`<h1>{{this.myLocale}}</h1>`;

        @service locale: LocaleService;
        get myLocale() {
          return this.locale.currentLocale;
        }
      }

      const owner = new Owner({
        locale: new LocaleService(),
      });

      const html = await render(MyComponent, {
        owner,
        services: {
          locale: new InvalidLocaleService(),
        },
      });

      assert.strictEqual(html, '<h1>en_US</h1>');
    });

    test('can render with a lazy owner and nested services', async (assert) => {
      const ctx = Object.freeze({
        locale: 'en_US',
      });

      class RequestContext extends Service {
        static from(ctx) {
          return class extends this {
            context = ctx;
          };
        }
      }

      class Play extends Service {
        @service request;

        get locale() {
          return this.request.context.locale;
        }
      }

      class Locale extends Service {
        @service play;
        get currentLocale() {
          return this.play.locale;
        }
      }

      class MyComponent extends Component {
        static template = hbs`<h1>{{this.myLocale}}</h1>`;

        @service locale: Locale;
        get myLocale() {
          return this.locale.currentLocale;
        }
      }

      const owner = new LazyOwner({
        request: RequestContext.from(ctx),
        play: Play,
        locale: Locale,
      });

      const html = await render(MyComponent, {
        owner,
      });
      assert.strictEqual(html, '<h1>en_US</h1>');
    });
  });
}
