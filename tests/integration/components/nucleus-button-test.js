import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import a11yAudit from 'ember-a11y-testing/test-support/audit';

module('Integration | Component | nucleus-button', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{nucleus-button}}`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#nucleus-button}}
        template block text
      {{/nucleus-button}}
    `);


    assert.equal(this.element.textContent.trim(), 'template block text');
  });

    test('it renders without accessibility errors', async function(assert) {

    await render(hbs`{{nucleus-button}}`);

    let axeOptions = { };

    return a11yAudit(this.element, axeOptions).then(() => {
      assert.ok(true, 'no a11y errors found!');
    });
  });

});
