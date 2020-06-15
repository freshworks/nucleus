import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import backstop from 'ember-backstop/test-support/backstop';
import a11yAudit from 'ember-a11y-testing/test-support/audit';


module('Integration | Component | nucleus-badge', function(hooks) {
  setupRenderingTest(hooks);
 
  test('it has HTML attributes', async function(assert) {
    await render(hbs`{{nucleus-badge id="test"}}`);

    assert.dom('.nucleus-badge').hasAttribute('id', 'test');
  });
  test('it has correct markup', async function(assert) {
    await render(hbs`{{nucleus-badge}}`);

    assert.dom('.nucleus-badge').exists({ count: 1 }, 'Badge wrap exists.');
  });

  test('badges pass visual regression tests', async function(assert) {
    await render(hbs`{{#nucleus-badge type="line" variant="critical"}}11{{/nucleus-badge}}
   {{#nucleus-badge type="line" variant="nuetral"}}22{{/nucleus-badge}}
   {{#nucleus-badge type="line" variant="new"}}33{{/nucleus-badge}}
   {{#nucleus-badge type="line" variant="primary"}}44{{/nucleus-badge}}
   {{#nucleus-badge type="solid" variant="critical"}}55{{/nucleus-badge}}
   {{#nucleus-badge type="solid" variant="neutral"}}66{{/nucleus-badge}}
   {{#nucleus-badge type="solid" variant="new"}}77{{/nucleus-badge}}
   {{#nucleus-badge type="solid" variant="new"}}BETA{{/nucleus-badge}}
   {{#nucleus-badge type="solid" variant="primary"}}88{{/nucleus-badge}}`);
    await backstop(assert,{scenario: {misMatchThreshold: 0.1}});
  });
  test('it passes a11y tests', async function(assert) {
    await render(hbs`{{#nucleus-badge variant="solidCritical"}}55{{/nucleus-badge}}`);
   
    return a11yAudit(this.element).then(() => {
      assert.ok(true, 'no a11y errors found!');
    });
  });

});
