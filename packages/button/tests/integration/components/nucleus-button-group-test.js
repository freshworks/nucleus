// import { run } from '@ember/runloop';

import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {  render, click } from '@ember/test-helpers';
import test from 'ember-sinon-qunit/test-support/test';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | nucleus-button-group', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('it has correct size', async function(assert) {
    await render(hbs`{{#nucleus-button size="mini"}}Test{{/nucleus-button}}`);

    assert.dom('button').hasClass('nucleus-button--mini', 'button has correct size class');
  });

  test('it has correct variant', async function(assert) {
    await render(hbs`{{#nucleus-button variant="secondary"}}Test{{/nucleus-button}}`);

    assert.dom('button').hasClass('nucleus-button', 'button has nucleus-button class');
    assert.dom('button').hasClass('nucleus-button--secondary', 'button has appropriate variant class');
    assert.dom('button').doesNotHaveClass('nucleus-button--primary', 'button does not have primary class');
  });

  test('it can be block', async function(assert) {
    await render(hbs`{{#nucleus-button block=true}}Test{{/nucleus-button}}`);

    assert.dom('button').hasClass('nucleus-button--block', 'button has block class');
  });

  test('it has HTML attributes', async function(assert) {
    await render(hbs`{{#nucleus-button id="test" disabled=true}}Test{{/nucleus-button}}`);

    assert.equal(this.element.querySelector('button').getAttribute('id'), 'test');
    assert.equal(this.element.querySelector('button').getAttribute('disabled'), '');
  });

  test('it has default label', async function(assert) {
    await render(hbs`{{nucleus-button label="test"}}`);
    assert.dom('button').hasText('test');
  });

  test('it has default type "button"', async function(assert) {
    await render(hbs`{{nucleus-button}}`);
    assert.equal(this.element.querySelector('button').type, 'button');
  });

  test('it with icon property shows icon', async function(assert) {
    await render(hbs`{{nucleus-button icon="nucleus-cross" iconOnly=true}}`);

    assert.dom('button svg').hasClass('nucleus-icon', 'svg icon is rendered');
  });

  test('it sends onClick action with "args" property as a parameter', async function(assert) {
    let action = this.spy();
    this.actions.testAction = action;
    await render(hbs`{{nucleus-button onClick=(action "testAction") args="foo"}}`);

    await click('button');
    assert.ok(action.calledWith('foo'), 'onClick action has been called with button arguments');
  });

  

  test('it prevents event to bubble up', async function(assert) {
    let buttonClick = this.spy();
    this.actions.buttonClick = buttonClick;
    let parentClick = this.spy();
    this.actions.parentClick = parentClick;

    await render(
      hbs`<div {{action "parentClick"}}>{{#nucleus-button onClick=(action "buttonClick")}}Button{{/nucleus-button}}</div>`
    );

    await click('button');
    assert.ok(buttonClick.called);
    assert.notOk(parentClick.called);
  });
});
