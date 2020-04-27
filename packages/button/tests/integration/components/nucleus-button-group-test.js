import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {  render } from '@ember/test-helpers';
import test from 'ember-sinon-qunit/test-support/test';
import hbs from 'htmlbars-inline-precompile';
import backstop from 'ember-backstop/test-support/backstop';
module('Integration | Component | nucleus-button-group', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('it has correct markup', async function(assert) {
    await render(hbs`{{nucleus-button-group}}`);
    assert.dom('.nucleus-button-group').exists({ count: 1 }, 'Button-Group wrap exists.');
  });
  
    test('buttons pass visual regression tests', async function(assert) {
    await render(hbs`{{#nucleus-button-group}}  {{#nucleus-button}}Button1{{/nucleus-button}}   {{#nucleus-button}}Button2{{/nucleus-button}} {{#nucleus-button}}Button3{{/nucleus-button}}{{/nucleus-button-group}}`);
    await backstop(assert,{scenario: {misMatchThreshold: 0}});
  });
});
