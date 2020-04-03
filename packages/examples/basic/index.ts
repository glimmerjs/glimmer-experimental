import { renderComponent } from '@glimmerx/core';
import MyComponent from './src/MyComponent';
import LocaleService from './src/services/LocaleService';

document.addEventListener(
  'DOMContentLoaded',
  () => {
    const element = document.getElementById('app');
    renderComponent(MyComponent, {
      element: element!,
      services: {
        locale: new LocaleService('en_US'),
      },
    });
  },
  { once: true }
);
