import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
import { render, click, triggerKeyEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import setupModal from '../../helpers/setup-modal';
//import backstop from 'ember-backstop/test-support/backstop';

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
/*
  //Note: All Visual Regression Tests for modal based objects require a div container with a fixed height
  test('visual regression for modal', async function(assert) {
    await render(hbs`<div id="viewport-container" style="height:900px">
    </div>
  {{#nucleus-modal open=true as |modal|}}
    {{modal.header title="Dialog"}}
    {{#modal.body}}Hello world!{{/modal.body}}
    {{modal.footer closeTitle="Ok"}}
  {{/nucleus-modal}}
    `)
    await backstop(assert, {scenario:{misMatchThreshold: 0.99}});
  });

  test('visual regression for normal confirm dialog', async function(assert) {
    await render(hbs`<div id="viewport-container" style="height:900px">
    </div>
  {{#nucleus-confirm-dialog
    title="Account Cancellation"
    open=true as |modal|
   }}
    Your account will be shut down in 24 hours
  {{/nucleus-confirm-dialog}}
    `)
    await backstop(assert, {scenario: {misMatchThreshold: 0.99}});
  });

  test('visual regression for slider', async function(assert) {
    await render(hbs`<div id="viewport-container" style="height:900px">
    </div>
    {{#nucleus-slider
      open=true as |modal|}}
      {{modal.header
        title="Title"
        icon="rewards"
        description="Some description"}}
      {{#modal.body}}
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing diam donec adipiscing tristique risus nec. Ullamcorper morbi tincidunt ornare massa eget egestas. Vestibulum lectus mauris ultrices eros in cursus. Justo laoreet sit amet cursus. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. In mollis nunc sed id semper risus in. Et pharetra pharetra massa massa ultricies mi quis. A scelerisque purus semper eget duis at tellus. Duis convallis convallis tellus id. Cursus vitae congue mauris rhoncus aenean vel elit. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Leo a diam sollicitudin tempor. Velit laoreet id donec ultrices tincidunt. Et magnis dis parturient montes nascetur ridiculus. Massa enim nec dui nunc. Feugiat sed lectus vestibulum mattis. Ac tincidunt vitae semper quis lectus nulla at volutpat.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing diam donec adipiscing tristique risus nec. Ullamcorper morbi tincidunt ornare massa eget egestas. Vestibulum lectus mauris ultrices eros in cursus. Justo laoreet sit amet cursus. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. In mollis nunc sed id semper risus in. Et pharetra pharetra massa massa ultricies mi quis. A scelerisque purus semper eget duis at tellus. Duis convallis convallis tellus id. Cursus vitae congue mauris rhoncus aenean vel elit. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Leo a diam sollicitudin tempor. Velit laoreet id donec ultrices tincidunt. Et magnis dis parturient montes nascetur ridiculus. Massa enim nec dui nunc. Feugiat sed lectus vestibulum mattis. Ac tincidunt vitae semper quis lectus nulla at volutpat.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing diam donec adipiscing tristique risus nec. Ullamcorper morbi tincidunt ornare massa eget egestas. Vestibulum lectus mauris ultrices eros in cursus. Justo laoreet sit amet cursus. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. In mollis nunc sed id semper risus in. Et pharetra pharetra massa massa ultricies mi quis. A scelerisque purus semper eget duis at tellus. Duis convallis convallis tellus id. Cursus vitae congue mauris rhoncus aenean vel elit. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Leo a diam sollicitudin tempor. Velit laoreet id donec ultrices tincidunt. Et magnis dis parturient montes nascetur ridiculus. Massa enim nec dui nunc. Feugiat sed lectus vestibulum mattis. Ac tincidunt vitae semper quis lectus nulla at volutpat.</p>
      {{/modal.body}}
      {{modal.footer submitTitle="Next" closeTitle="Close"}}
    {{/nucleus-slider}}
    `)
    await backstop(assert, {scenario: {misMatchThreshold: 100}});
  });

  test('visual regression for large confirm dialog', async function(assert) {
    await render(hbs`<div id="viewport-container" style="height:900px">
    </div>
  {{#nucleus-confirm-dialog
    size = "large"
    title="Account Cancellation"
    type="danger"
    open=true as |modal|
   }}
    Your account will be shut down in 24 hours
  {{/nucleus-confirm-dialog}}
    `)
    await backstop(assert, {scenario: {misMatchThreshold: 100}});
  }); 
  */
});