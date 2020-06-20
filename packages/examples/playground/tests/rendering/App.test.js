import { module, test, renderComponent, didRender } from '../util';

import App from '../../src/App';

module('App test', () => {
  test('it loads', async (assert) => {
    await renderComponent(App);

    assert.dom('.editor').exists();
    assert.dom('.sandbox').exists();

    assert.dom('.sandbox h1').containsText('Welcome to the GlimmerX Playground!');
    assert.dom('.sandbox p').containsText('You have clicked the button 1 times.');

    document.querySelector('.sandbox button').click();
    await didRender();

    assert.dom('.sandbox p').containsText('You have clicked the button 2 times.');
  });
});
