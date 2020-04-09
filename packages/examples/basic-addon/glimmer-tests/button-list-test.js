/* global QUnit */
import { renderComponent, didRender } from '@glimmerx/core';
import { hbs } from '@glimmerx/component';
import { ButtonList, ButtonListService } from 'basic-addon';

const { module, test } = QUnit;

module('Integration | Component | button-list', function() {
  test('it renders', async function(assert) {
    const container = document.getElementById('qunit-fixture');

    await renderComponent(
      hbs`
        <ButtonList class="first" />
        <ButtonList class="second" />
      `,
      {
        element: container,
        services: {
          buttonList: new ButtonListService(),
        },
      }
    );

    const buttons = Array.from(container.querySelectorAll('button'));

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

    firstButtons[0].click();
    await didRender();

    assert.equal(firstButtons[0].innerText, '124', 'first button list updated correctly');
    assert.equal(firstButtons[1].innerText, '123', 'first button list updated correctly');
    assert.equal(firstButtons[2].innerText, '123', 'first button list updated correctly');

    assert.equal(secondButtons[0].innerText, '124', 'second button list updated correctly');
    assert.equal(secondButtons[1].innerText, '123', 'second button list updated correctly');
    assert.equal(secondButtons[2].innerText, '123', 'second button list updated correctly');
  });
});
