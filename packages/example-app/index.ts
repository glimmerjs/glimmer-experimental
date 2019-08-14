import { renderComponent } from '@glimmerx/core';
import MyComponent from './src/MyComponent';

document.addEventListener('DOMContentLoaded', () => {
  const element = document.getElementById('app');
  renderComponent(MyComponent, element!);
}, { once: true });