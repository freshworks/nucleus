import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
import { render, click, triggerKeyEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import setupModal from '../../helpers/setup-modal';

module('Integration | Component | nucleus-modal', function(hooks) {
  setupRenderingTest(hooks);
  setupModal(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('it yields header, footer and body components', async function(assert) {
    await render(hbs`{{#nucleus-modal open=true as |modal|}}
      {{modal.header title="Dialog"}}
      {{#modal.body}}Hello world!{{/modal.body}}
      {{modal.footer closeTitle="Ok"}}
    {{/nucleus-modal}}`);

    assert.dom('.nucleus-modal').exists({ count: 1 }, 'Modal exists.');
    assert.dom('.nucleus-modal .nucleus-modal__header').exists({ count: 1 }, 'Modal has header.');
    assert.dom('.nucleus-modal .nucleus-modal__header .title').hasText('Dialog', 'Modal header has correct title.');
    assert.dom('.nucleus-modal .nucleus-modal__footer').exists({ count: 1 }, 'Modal has footer.');
    assert.dom('.nucleus-modal .nucleus-modal__footer button').exists({ count: 1 }, 'Modal has button in footer.');
    assert.dom('.nucleus-modal .nucleus-modal__footer button').hasText('Ok', 'Modal button has default title.');
    assert.dom('.nucleus-modal .nucleus-modal__body').exists({ count: 1 }, 'Modal has body.');
    assert.dom('.nucleus-modal .nucleus-modal__body').hasText('Hello world!', 'Modal body has correct content.');
  });

  test('it does not render when open=false', async function(assert) {
    this.set('isModalOpen', true);
    await render(hbs`{{#nucleus-modal open=isModalOpen as |modal|}}
      {{modal.header title="Dialog"}}
      {{#modal.body}}Hello world!{{/modal.body}}
      {{modal.footer}}
    {{/nucleus-modal}}`);
    this.set('isModalOpen', false);

    assert.dom('.nucleus-modal *').doesNotExist('Modal does not exist.');
  });

  test('it yields close action', async function(assert) {
    let closeAction = this.spy();
    this.actions.close = closeAction;

    await render(hbs`{{#nucleus-modal open=true onClose=(action "close") as |modal|}}
      {{modal.header title="Dialog"}}
      {{#modal.body}}Hello world!{{/modal.body}}
      {{#modal.footer}}
        <button id="close" {{action modal.close}}>Close</button>
      {{/modal.footer}}
    {{/nucleus-modal}}`);

    await click('#close');
    assert.ok(closeAction.calledOnce, 'close action has been called.');
  });

  test('it closes on pressing ESC', async function(assert) {
    let closeAction = this.spy();
    this.actions.close = closeAction;

    await render(hbs`{{#nucleus-modal open=true onClose=(action "close") as |modal|}}
      {{modal.header title="Dialog"}}
      {{#modal.body}}Hello world!{{/modal.body}}
      {{#modal.footer}}
        <button id="close" {{action modal.close}}>Close</button>
      {{/modal.footer}}
    {{/nucleus-modal}}`);

    await triggerKeyEvent('.nucleus-modal__dialog', 'keydown', 'Escape');
    assert.ok(closeAction.calledOnce, 'close action has been called.');
  });

  test('it yields submit action', async function(assert) {
    let submitAction = this.spy();
    this.actions.submit = submitAction;

    await render(hbs`{{#nucleus-modal open=true onSubmit=(action "submit") as |modal|}}
      {{modal.header title="Dialog"}}
      {{#modal.body}}Hello world!{{/modal.body}}
      {{#modal.footer}}
        <button id="submit" {{action modal.submit}}>Submit</button>
      {{/modal.footer}}
    {{/nucleus-modal}}`);

    await click('#submit');
    assert.ok(submitAction.calledOnce, 'submit action has been called.');
  });

  test('it has accessibility attributes', async function(assert) {
    this.set('isModalOpen', false);
    await render(hbs`{{#nucleus-modal open=isModalOpen as |modal|}}
      {{modal.header title="Some title"}}
      {{#modal.body}}Hello world!{{/modal.body}}
      {{modal.footer}}
    {{/nucleus-modal}}`);
    this.set('isModalOpen', true);


    const modalTitleId = document.querySelector('.nucleus-modal__header .title').id;

    assert.dom('.nucleus-modal').hasAttribute('role', 'dialog');
    assert.dom('.nucleus-modal').hasAttribute('aria-labelledby', modalTitleId);
  });

  test('it passes along class attribute', async function(assert) {
    await render(hbs`
      {{#nucleus-modal open=true type="danger" as |modal|}}
        {{modal.header title="Some title"}}
        {{#modal.body}}Hello world!{{/modal.body}}
        {{modal.footer submitTitle="Ok"}}
      {{/nucleus-modal}}
    `);

    assert.dom('.nucleus-modal .nucleus-modal__footer button').hasClass('nucleus-button--danger', 'Modal button has danger class.');
  });

  test('it passes a11y tests', async function(assert) {
    await render(hbs`{{#nucleus-modal open=true as |modal|}}
      {{modal.header title="Dialog"}}
      {{#modal.body}}Hello world!{{/modal.body}}
      {{modal.footer closeTitle="Ok"}}
    {{/nucleus-modal}}`);
   
    let axeOptions = {
      rules: {
        'button-name': {
          enabled: false
        }
      }
    };
    return a11yAudit(this.element, axeOptions).then(() => {
      assert.ok(true, 'no a11y errors found!');
    });
  });
});