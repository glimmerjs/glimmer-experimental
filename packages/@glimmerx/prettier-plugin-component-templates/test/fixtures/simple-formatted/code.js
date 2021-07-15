import Component, { hbs } from '@glimmerx/component';

const StripWhitespace = hbs`     
`;

const InlineText = hbs`     Hello World`;

const HardlineText = hbs`
            Hello World
`;

const InlineTagWrappedText = hbs`<h1>    Hello World     </h1>     `;

const HardlineTagText = hbs`
      <h1>
          Hello World
</h1>
`;


export default class Simple extends Component {
  static template = hbs`
  <StripWhiteSpace/>
    <InlineText/>
       <HardlineText/>
               <InlineTagWrappedText/>
                          <HardlineTagText/>
  `;
}