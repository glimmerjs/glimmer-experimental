
class Class1Declaration extends Component {
  static template = hbs`<h1>Hello world</h1>`;
}

const Class1Expression = class extends Component {
  static template = hbs`<h1>Hello world</h1>`;
}

class Class2Declaration extends Component {
  static template = hbs`<h2>
    Goodbye world
  </h2>`;
}

const Class2Expression = class extends Component {
  static template = hbs`<h2>
    Goodbye world
  </h2>`;
}