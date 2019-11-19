import { module } from 'qunit';
import Service from '@ember/service';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import test from 'ember-sinon-qunit/test-support/test';
import hbs from 'htmlbars-inline-precompile';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
import setupBanner from '../../helpers/setup-banner';
import { ITEMS } from '../../constants/nucleus-banner';

let StubMapsService = Service.extend({
  items: ITEMS
});

module('Integration | Component | nucleus-banner', function(hooks) {
  setupRenderingTest(hooks);
  setupBanner(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
    this.owner.register('service:nucleus-banner', StubMapsService);
  });

  test('it has correct markup', async function(assert) {
    await render(hbs`{{nucleus-banner}}`);

    assert.dom('.nucleus-banner').exists({ count: 1 }, 'Banner exists.');
    assert.dom('.nucleus-banner .nucleus-banner__main').exists({ count: 1 }, 'Banner text is rendered.');
    assert.dom('.nucleus-banner .nucleus-banner__more').exists({ count: 1 }, 'Banner more section is rendered.');
  });

  test('it has fixed class', async function(assert) {
    await render(hbs`{{nucleus-banner isFixed=true}}`);

    assert.dom('.nucleus-banner').hasClass('nucleus-banner--fixed', 'Banner has fixed class.');
  });

  test('it shows stacked notifications', async function(assert) {
    await render(hbs`{{nucleus-banner}}`);

    await click('.nucleus-banner__more button');
    assert.dom('.nucleus-banner__more .more-card').exists({ count: 1 }, 'Stacked notifications are displayed.');
  });

  test('it passes a11y tests', async function(assert) {
    await render(hbs`{{nucleus-banner}}`);
   
    return a11yAudit(this.element).then(() => {
      assert.ok(true, 'no a11y errors found!');
    });
  });
});
