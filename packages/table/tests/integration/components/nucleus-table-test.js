// import { run } from '@ember/runloop';
import { defer } from 'rsvp';
import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render, click, settled, waitUntil, waitFor } from '@ember/test-helpers';
import test from 'ember-sinon-qunit/test-support/test';
import hbs from 'htmlbars-inline-precompile';
import a11yAudit from 'ember-a11y-testing/test-support/audit';

module('Integration | Component | nucleus-table', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });
});
