import { storiesOf } from '@glimmerx/storybook';
import MyComponent from './MyComponent';
import LocaleService from './services/LocaleService';

storiesOf('MyComponent Stories', module)
.add('With service passed in render options', () => ({
  componentClass: MyComponent,
  renderOptions: {
    services: {
      locale: new LocaleService('fr_FR')
    }
  }
}));