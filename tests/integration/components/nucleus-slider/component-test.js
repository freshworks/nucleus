import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | nucleus-slider', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders modal properly', async function(assert) {
    await render(hbs`
      {{#nucleus-slider as |modal|}}
        {{modal.close}}

        {{#modal.header}}Header{{/modal.header}}
        {{#modal.body}}
          Body
        {{/modal.body}}

        {{#modal.footer}}
          Footer
        {{/modal.footer}}
      {{/nucleus-slider}}
    `);

    assert.equal(this.element.querySelector('.nucleus-slider-header').textContent.trim(), 'Header');
    assert.equal(this.element.querySelector('.nucleus-slider-body').textContent.trim(), 'Body');
    assert.equal(this.element.querySelector('.nucleus-slider-footer').textContent.trim(), 'Footer');
  });
});
