import { module } from 'qunit';
import Service from '@ember/service';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import test from 'ember-sinon-qunit/test-support/test';
import hbs from 'htmlbars-inline-precompile';
// import a11yAudit from 'ember-a11y-testing/test-support/audit';

let ITEMS = [
  {
    'title': 'Lorem ipsum',
    'type': 'danger'
  }
];

let StubMapsService = Service.extend({
  items: ITEMS
});

module('Integration | Component | nucleus-banner', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
    this.owner.register('service:nucleus-banner', StubMapsService);
  });

  test('it has correct markup', async function(assert) {
    await render(hbs`{{nucleus-banner}}`);

    assert.dom('.nucleus-banner').exists({ count: 1 }, 'Banner exists.');
    assert.dom('.nucleus-banner .nucleus-banner__main').exists({ count: 1 }, 'Banner has title.');
  });
});
