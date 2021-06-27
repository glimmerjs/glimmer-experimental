import Component, { hbs } from '@glimmerx/component';

/**
 * @class HelloWorld
 * @extends Component
 */
export default class HelloWorld extends Component {
  // @ts-ignore
  #somePrivate() {}

  /**
   * Prettier has no opinion about rewriting long comment block style comments should not be rewritten.
   * @param  {...any} args
   */
  constructor(...args) {
    // @ts-ignore
    super(...args);
    this.#somePrivate(); // Write me!
  }
  static template = hbs`
  <Local>
<:head>
<div>Hello {{name}}</div>
   </:head>
  </Local>
`;
  /**
   * @returns { String } name;
   */
  get name() {
    return 'Sally';
  }
}
