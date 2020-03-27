import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import test from 'ember-sinon-qunit/test-support/test';
import hbs from 'htmlbars-inline-precompile';
import backstop from 'ember-backstop/test-support/backstop';
import a11yAudit from 'ember-a11y-testing/test-support/audit';

module('Integration | Component | nucleus-toggle', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('it has correct markup', async function(assert) {
    await render(hbs`{{nucleus-toggle}}`);

    assert.dom('.nucleus-toggle').exists({ count: 1 }, 'Toggle wrap exists.');
  });

  test('it has correct size', async function(assert) {
    await render(hbs`{{nucleus-toggle size="small"}}`);

    assert.dom('.nucleus-toggle--small').exists({ count: 1 }, 'Toggle has correct size');
  });

  test('it has HTML attributes', async function(assert) {
    await render(hbs`{{nucleus-toggle id="test" disabled=true}}`);

    assert.dom('.nucleus-toggle').hasAttribute('id', 'test');
    assert.dom('.nucleus-toggle').hasAttribute('disabled');
  });

  test('it must render toggle state based icon', async function(assert) {
    await render(hbs`{{nucleus-toggle}}`);

    assert.dom('.nucleus-toggle svg').hasClass('thumb__control--icon', 'svg icon is rendered');
  });

  test('it must have aria-checked property', async function(assert) {
    await render(hbs`{{nucleus-toggle id="test" value="true"}}`);

    assert.dom('.nucleus-toggle').hasAttribute('aria-checked');

    await click('.nucleus-toggle input');

    assert.dom('.nucleus-toggle').doesNotHaveAttribute('aria-checked');
  });

  test('it sends onClick action with "args" property as a parameter', async function(assert) {
    let action = this.spy();
    this.actions.testAction = action;
    await render(hbs`{{nucleus-toggle onClick=(action "testAction")}}`);

    await click('.nucleus-toggle input');
    assert.ok(action.calledOnce, 'onClick action has been called with arguments');
  });

  test('toggle pass visual regression tests', async function(assert) {
    await render(hbs`
      {{nucleus-toggle size="large"}}
      {{nucleus-toggle size="medium"}}
      {{nucleus-toggle size="small"}}
      {{nucleus-toggle disabled=true}}
      {{nucleus-toggle disabled=false}}
      {{nucleus-toggle value=true}}
      {{nucleus-toggle value=false}}`);
    await backstop(assert,{scenario: {misMatchThreshold: 0.1}});
  });

  test('it passes a11y tests', async function(assert) {
    await render(hbs`{{nucleus-toggle label="test" size="large" ariaLabel="toggle"}}`);
   
    return a11yAudit(this.element).then(() => {
      assert.ok(true, 'no a11y errors found!');
    });
  });
});
