import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | button-list', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`
      <ButtonList class="first" />
      <ButtonList class="second" />
    `);

    const buttons = findAll('button');

    assert.equal(buttons.length, 6, 'correct number of buttons rendered');

    for (let button of buttons) {
      assert.equal(button.innerText, '123', 'buttons start with the correct value');
    }

    let firstButtons = buttons.slice(0, 3);
    let secondButtons = buttons.slice(3);

    for (let button of firstButtons) {
      assert.ok(button.classList.contains('first'));
    }

    for (let button of secondButtons) {
      assert.ok(button.classList.contains('second'));
    }

    await click(firstButtons[0]);

    assert.equal(firstButtons[0].innerText, '124', 'first button list updated correctly');
    assert.equal(firstButtons[1].innerText, '123', 'first button list updated correctly');
    assert.equal(firstButtons[2].innerText, '123', 'first button list updated correctly');

    assert.equal(secondButtons[0].innerText, '124', 'second button list updated correctly');
    assert.equal(secondButtons[1].innerText, '123', 'second button list updated correctly');
    assert.equal(secondButtons[2].innerText, '123', 'second button list updated correctly');
  });
});
