import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ui-slider-modal/body', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`
      {{#ui-slider-modal/body}}
      template block text is rendered in body
      {{/ui-slider-modal/body}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text is rendered in body');
  });
});
