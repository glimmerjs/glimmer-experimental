import plugin from '.';
import pluginTester from 'babel-plugin-tester';

pluginTester({
  plugin,
  tests: [{
    code: `
      import OtherComponent from './OtherComponent';

      class MyComponent extends Component {
        static template = hbs\`<h1>Hello world</h1>\`;
      }
    `,
    output: `
      import { setComponentTemplate as _setComponentTemplate } from "glimmer-lite-core";
      import OtherComponent from './OtherComponent';

      class MyComponent extends Component {}

      _setComponentTemplate(MyComponent, {
        id: "pX6MO7j4",
        block: "{\\"symbols\\":[],\\"statements\\":[[7,\\"h1\\",true],[9],[0,\\"Hello world\\"],[10]],\\"hasEval\\":false}",
        meta: {
          scope: () => ({
            OtherComponent,
            MyComponent
          })
        }
      })
    `
  }, {
    code: `
      const MyComponent = class extends Component {
        static template = hbs\`<h1>Hello world</h1>\`;
      }
    `,
    output: `
      import { setComponentTemplate as _setComponentTemplate } from "glimmer-lite-core";

      const MyComponent = _setComponentTemplate(class extends Component {}, {
        id: "pX6MO7j4",
        block: "{\\"symbols\\":[],\\"statements\\":[[7,\\"h1\\",true],[9],[0,\\"Hello world\\"],[10]],\\"hasEval\\":false}",
        meta: {
          scope: () => ({
            MyComponent
          })
        }
      });
    `
  }]
});