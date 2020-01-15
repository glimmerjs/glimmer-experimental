import { hbs } from '@glimmerx/component';
import OtherComponent from './OtherComponent';
import PhantomComponent from './PhantomComponent';
import SecondPhantomComponent from './SecondPhantomComponent'


const hbsOnlyTemplate = hbs`
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