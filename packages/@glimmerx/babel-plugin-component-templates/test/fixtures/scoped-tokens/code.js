import Component, { hbs } from '@glimmerx/component';
import OtherComponent from './OtherComponent';
import PhantomComponent from './PhantomComponent';
import SecondPhantomComponent from './SecondPhantomComponent'


class MyComponent extends Component {
  static template = hbs`
    <h1>Hello world 
        {{#OtherComponent as  |SecondPhantomComponent|}}
            <SecondPhantomComponent />
            {{SecondPhantomComponent}}
        {{/OtherComponent}}
        <OtherComponent as |PhantomComponent|>
            <PhantomComponent /> 
            {{PhantomComponent}}
        </OtherComponent>
    </h1>`;
}