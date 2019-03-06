import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | nucleus-slider/header', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`
      {{#nucleus-slider/header}}
        header text
      {{/nucleus-slider/header}}
    `);

    assert.equal(this.element.textContent.trim(), 'header text');
  });
});
