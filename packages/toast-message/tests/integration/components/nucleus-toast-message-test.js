import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import FlashMessage from 'ember-cli-flash/flash/object';

module('Integration | Component | nucleus-toast-message', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    const typesUsed = ['info', 'warning', 'success', 'danger'];
    this.owner.lookup('service:flash-messages').registerTypes(typesUsed);
  });

  test('it renders', async function(assert) {
    this.set('flash', { queue: [ FlashMessage.create({ message: "Notification", sticky: true, type: 'success' }) ] });
    await render(hbs`{{nucleus-toast-message flashMessages=flash}}`);
    assert.dom('.nucleus-toast-message').exists({ count: 1 }, 'Toast message is rendered.');
    assert.dom('.nucleus-toast-message .nucleus-toast-message__icon').exists({ count: 1 }, 'Toast message has icon.');
    assert.dom('.nucleus-toast-message .nucleus-toast-message__content').exists({ count: 1 }, 'Toast message has icon.');
    assert.dom('.nucleus-toast-message .nucleus-toast-message__content').hasText('Notification', 'Toast message has correct title.');
    assert.dom('.nucleus-toast-message .alert__close').exists({ count: 1 }, 'Toast message has close button.');
  });

  test('it renders variants', async function(assert) {
    this.set('flash', { queue: [ FlashMessage.create({ message: "Notification", sticky: true, type: 'danger' }) ] });
    await render(hbs`{{nucleus-toast-message flashMessages=flash}}`);
    assert.dom('.nucleus-toast-message').exists({ count: 1 }, 'Toast message is rendered.');
    assert.dom('.nucleus-toast-message').hasClass('alert-danger', 'Toast message has corresponding class.');
  });
});