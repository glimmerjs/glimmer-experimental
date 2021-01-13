import Component, { hbs } from '@glimmerx/component';

function root() {
  function nested() {
    class OtherComponent extends Component {
      static template = hbs`Hello World`;
    }

    class MyComponent extends Component {
      static template = hbs`<h1><OtherComponent/></h1>`
    }
  }
}
