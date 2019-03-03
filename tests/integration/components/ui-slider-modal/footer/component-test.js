import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ui-slider-modal/footer', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`
      {{#ui-slider-modal/footer}}
        footer text
      {{/ui-slider-modal/footer}}
    `);

    assert.equal(this.element.textContent.trim(), 'footer text');
  });
});
