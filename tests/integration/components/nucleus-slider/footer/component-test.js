import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | nucleus-slider/footer', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`
      {{#nucleus-slider/footer}}
        footer text
      {{/nucleus-slider/footer}}
    `);

    assert.equal(this.element.textContent.trim(), 'footer text');
  });
});
