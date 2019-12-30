import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import test from 'ember-sinon-qunit/test-support/test';
import hbs from 'htmlbars-inline-precompile';
import a11yAudit from 'ember-a11y-testing/test-support/audit';

module('Integration | Component | nucleus-icon', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('it has correct markup', async function(assert) {
    await render(hbs`{{nucleus-icon icon="nucleus-cross"}}`);

    assert.dom('svg').hasClass('nucleus-icon', 'icon has nucleus-icon class');
  });

  test('it has correct size', async function(assert) {
    await render(hbs`{{nucleus-icon icon="nucleus-cross" size="mini"}}`);

    assert.dom('svg').hasClass('nucleus-icon--mini', 'icon has correct size class');
  });

  test('it passes a11y tests', async function(assert) {
    await render(hbs`{{nucleus-icon icon="nucleus-cross"}}`);
   
    return a11yAudit(this.element).then(() => {
      assert.ok(true, 'no a11y errors found!');
    });
  });
});
