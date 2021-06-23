import { hbs } from '@glimmerx/component';
import RehydratingComponent from './RehydratingComponent';

export default hbs`
  <div class="static-component">
    <h1>Hello I am a static component. I don't change after page load.</h1>
    <RehydratingComponent />
  </div>
`;
