import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import backstop from 'ember-backstop/test-support/backstop';

module('Integration | Component | nucleus-inline-banner', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('it yields title, icon and close', async function(assert) {
    await render(hbs`{{nucleus-inline-banner
      type="success"
      title="Banner title"}}`);

    assert.dom('.nucleus-inline-banner').exists({ count: 1 }, 'Inline banner exists.');
    assert.dom('.nucleus-inline-banner .nucleus-inline-banner__icon').exists({ count: 1 }, 'Banner has icon.');
    assert.dom('.nucleus-inline-banner .nucleus-inline-banner__content').hasText('Banner title', 'Banner has correct title.');
    assert.dom('.nucleus-inline-banner .nucleus-inline-banner__close').exists({ count: 1 }, 'Banner has close button.');
  });

  test('it yields correct type & dismiss options', async function(assert) {
    await render(hbs`{{nucleus-inline-banner
      type="danger"
      isDismissible=false
      title="Banner title"}}`);

    assert.dom('.nucleus-inline-banner .nucleus-inline-banner__close').exists({ count: 0 }, 'Banner does not have close button.');
    assert.dom('.nucleus-inline-banner').hasClass('nucleus-inline-banner--danger', 'Banner has the corresponding type class.');
  });

  test('it gets dismissed on close', async function(assert) {

    await render(hbs`{{nucleus-inline-banner
      type="warning"
      title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }}`);

    await click('.nucleus-inline-banner__close button');
    assert.dom('.nucleus-inline-banner').hasClass('hide', 'Banner has been dismissed.');
  });

  test('it calls onClose action and gets dismissed on close', async function(assert) {
    let closeAction = this.spy();
    this.actions.close = closeAction;

    await render(hbs`{{nucleus-inline-banner
      type="warning"
      title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      onClose=(action "close")
    }}`);

    await click('.nucleus-inline-banner__close button');
    assert.ok(closeAction.calledOnce, 'close action has been called.');
    assert.dom('.nucleus-inline-banner').hasClass('hide', 'Banner has been dismissed.');
  });

  test('it passes a11y tests', async function(assert) {
    await render(hbs`{{nucleus-inline-banner
      type="success"
      title="Congratulations! You've successfully upgraded your account."}}`);
   
    return a11yAudit(this.element).then(() => {
      assert.ok(true, 'no a11y errors found!');
    });
  });

  test('it passes visual regression tests', async function(assert){
    await render(hbs`<div style="width: 900px; height: 500px; margin: auto">{{nucleus-inline-banner
      type="success"
      title="Banner title"}}
      <br/>
      {{nucleus-inline-banner
        type="danger"
        title="Banner title"}}
        <br/>
        {{nucleus-inline-banner
        type="warning"
        title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}}
        <br/>
        {{nucleus-inline-banner
          type="info"
          title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}}     
        <br/>
        {{#nucleus-inline-banner type="success" as |banner|}}
        <div>Some custom content. <a class="docs-link" onclick={{action banner.close}}>Click here to close.</a></div>
      {{/nucleus-inline-banner}}
        </div>
        `);
    await backstop(assert, {scenario:{misMatchThreshold:100}});
  });
});