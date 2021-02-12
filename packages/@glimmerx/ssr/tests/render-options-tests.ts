import Component, { hbs } from '@glimmerx/component';
import HTMLSerializer from '@simple-dom/serializer';
import voidMap from '@simple-dom/void-map';
import { SerializableNode } from '@simple-dom/interface';
import { renderToString, RenderOptions } from '..';
import Service, { service } from '@glimmerx/service';

QUnit.module('@glimmer/ssr rendering', () => {
  QUnit.test('options.serializer', async (assert) => {
    class MyComponent extends Component {
      static template = hbs`<h1>Hello World</h1>`;
    }

    class CustomHTMLSerializer extends HTMLSerializer {
      text(text: SerializableNode) {
        return super.text(text).replace(/Hello/g, 'Goodbye'); // Replaces repetitive whitespace with a single character.
      }
    }

    const options: RenderOptions = { serializer: new CustomHTMLSerializer(voidMap) };

    const output = await renderToString(MyComponent, options);

    assert.equal(output, '<h1>Goodbye World</h1>');
  });

  QUnit.test('options.services', async (assert) => {
    const ctx = Object.freeze({
      locale: 'en_US',
    });

    class Meta {
      id;

      constructor(id) {
        this.id = id;
      }
    }

    const meta = new Meta('ABC123');

    class Request extends Service {
      @service context;

      get locale() {
        return this.context.locale;
      }
    }

    class Locale extends Service {
      @service request;

      get currentLocale() {
        return this.request.locale;
      }
    }

    class MyComponent extends Component {
      static template = hbs`<h1>{{this.myLocale}},{{this.metaId}}</h1>`;

      @service locale: Locale;
      @service meta: Meta;

      get myLocale() {
        return this.locale.currentLocale;
      }
      get metaId() {
        return this.meta.id;
      }
    }

    const services = {
      context: ctx, // Pojo
      request: Request, // Constructor
      locale: Locale, // Constructor,
      meta: meta,
    };

    const options: RenderOptions = {
      services,
    };

    const output = await renderToString(MyComponent, options);

    assert.equal(output, '<h1>en_US,ABC123</h1>');
  });
});
