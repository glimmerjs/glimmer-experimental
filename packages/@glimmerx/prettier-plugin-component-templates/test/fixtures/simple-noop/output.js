import Component, { hbs } from '@glimmerx/component';

// const NoText = hbs``;
const NoText = hbs``;

// const InlineText = hbs`Hello World`;
const InlineText = hbs`Hello World`;

// const HardlineText = hbs`
//   Hello World
// `;
const HardlineText = hbs`
  Hello World
`;

// const InlineTagWrappedText = hbs`<h1>Hello World</h1>`;
const InlineTagWrappedText = hbs`<h1>Hello World</h1>`;

// const HardlineTagText = hbs`
//   <h1>
//     Hello World
//   </h1>
// `;
const HardlineTagText = hbs`
  <h1>
    Hello World
  </h1>
`;

// Should fix indent
export default class Simple extends Component {
  static template = hbs`
    <NoText />
    <InlineText />
    <HardlineText />
    <InlineTagWrappedText />
    <HardlineTagText />
  `;
}
