import { renderComponent } from '@glimmerx/core';
import { hbs } from '@glimmerx/component';

renderComponent(hbs`<h1>Hello {{@name}}</h1>`, {
  args: {
    name: 'Abhishek'
  },
  element: document.body
});