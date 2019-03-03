import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ui-slider-modal/close', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{ui-slider-modal/close}}`);

    assert.equal(this.element.textContent.trim(), '', 'Block is not allowed in close and renders empty textContent');
  });
});
