import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | nucleus-modal', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('Modal yields header, footer and body components', async function(assert) {
    await render(hbs`{{#nucleus-modal open=true as |modal|}}
      {{modal.header title="Dialog"}}
      {{#modal.body}}Hello world!{{/modal.body}}
      {{modal.footer closeTitle="Ok"}}
    {{/nucleus-modal}}`);

    assert.dom('.nucleus-modal').exists({ count: 1 }, 'Modal exists.');
    // assert.equal(this.element.querySelector('.nucleus-modal').length, 1);
    assert.dom('.nucleus-modal .nucleus-modal__header').exists({ count: 1 }, 'Modal has header.');
    assert.dom('.nucleus-modal .nucleus-modal__header .nucleus-modal-title').hasText('Dialog', 'Modal header has correct title.');
    assert.dom('.nucleus-modal .nucleus-modal__footer').exists({ count: 1 }, 'Modal has footer.');
    assert.dom('.nucleus-modal .nucleus-modal__footer button').exists({ count: 1 }, 'Modal has button in footer.');
    assert.dom('.nucleus-modal .nucleus-modal__footer button').hasText('Ok', 'Modal button has default title.');
    assert.dom('.nucleus-modal .nucleus-modal__body').exists({ count: 1 }, 'Modal has body.');
    assert.dom('.nucleus-modal .nucleus-modal__body').hasText('Hello world!', 'Modal body has correct content.');
  });

  test('Hidden modal does not render', async function(assert) {
    await render(hbs`{{#nucleus-modal open=false as |modal|}}
      {{modal.header title="Dialog"}}
      {{#modal.body}}Hello world!{{/modal.body}}
      {{modal.footer}}
    {{/nucleus-modal}}`);

    assert.dom('.nucleus-modal *').doesNotExist('Modal does not exist.');
  });

  test('Modal yields close action', async function(assert) {
    let closeAction = this.spy();
    this.actions.close = closeAction;

    await render(hbs`{{#nucleus-modal onHide=(action "close") as |modal|}}
      {{modal.header title="Dialog"}}
      {{#modal.body}}Hello world!{{/modal.body}}
      {{#modal.footer}}
        <button id="close" {{action modal.close}}>Close</button>
      {{/modal.footer}}
    {{/nucleus-modal}}`);

    await click('#close');
    assert.ok(closeAction.calledOnce, 'close action has been called.');
  });

  test('Modal yields submit action', async function(assert) {
    let submitAction = this.spy();
    this.actions.submit = submitAction;

    await render(hbs`{{#nucleus-modal onSubmit=(action "submit") as |modal|}}
      {{modal.header title="Dialog"}}
      {{#modal.body}}Hello world!{{/modal.body}}
      {{#modal.footer}}
        <button id="submit" {{action modal.submit}}>Submit</button>
      {{/modal.footer}}
    {{/nucleus-modal}}`);

    await click('#submit');
    assert.ok(submitAction.calledOnce, 'submit action has been called.');
  });

  test('Modal has accessibility attributes', async function(assert) {

    await render(hbs`{{#nucleus-modal as |modal|}}
      {{modal.header title="Some title"}}
      {{#modal.body}}Hello world!{{/modal.body}}
      {{modal.footer}}
    {{/nucleus-modal}}`);

    const modalTitleId = document.getElementsByClassName('modal-title')[0].id;

    assert.dom('.nucleus-modal').exists({ count: 1 }, 'Modal exists.');
    assert.dom('.nucleus-modal').hasAttribute('role', 'dialog');
    assert.dom('.nucleus-modal').hasAttribute('aria-labelledby', modalTitleId);
  });

  test('it passes along class attribute', async function(assert) {
    await render(hbs`
      {{#nucleus-modal type=danger}}
        {{modal.header title="Some title"}}
        {{#modal.body}}Hello world!{{/modal.body}}
        {{modal.footer submitTitle="Ok"}}
      {{/nucleus-modal}}
    `);

    assert.dom('.nucleus-modal .nucleus-modal__footer button').hasClass('btn--danger', 'Modal button has danger class.');
  });
});