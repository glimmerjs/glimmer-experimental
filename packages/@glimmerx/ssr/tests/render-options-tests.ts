import Component, { hbs } from '@glimmerx/component';
import HTMLSerializer from '@simple-dom/serializer';
import voidMap from '@simple-dom/void-map';
import { SerializableNode } from '@simple-dom/interface';
import { renderToString, RenderOptions } from '..';

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
});
