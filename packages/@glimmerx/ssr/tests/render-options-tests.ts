import Component, { hbs } from '@glimmerx/component';
import HTMLSerializer from '@simple-dom/serializer';
import voidMap from '@simple-dom/void-map';
import { SerializableNode } from '@simple-dom/interface';
import { renderToString, RenderOptions } from '..';
import { service } from '@glimmerx/service';
import { Owner } from '@glimmerx/core';

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
  QUnit.test('options.owner', async (assert) => {
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

    const options: RenderOptions = { owner, services: { locaele: new InvalidLocaleService() } };

    const output = await renderToString(MyComponent, options);

    assert.equal(output, '<h1>en_US</h1>');
  });
});
