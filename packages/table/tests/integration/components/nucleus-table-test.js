// import { run } from '@ember/runloop';
import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { A } from '@ember/array';
import { render } from '@ember/test-helpers';
import test from 'ember-sinon-qunit/test-support/test';
import hbs from 'htmlbars-inline-precompile';
import backstop from 'ember-backstop/test-support/backstop';
import a11yAudit from 'ember-a11y-testing/test-support/audit';

module('Integration | Component | nucleus-table', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });
  let columns = A([
    { name: 'Source', valuePath: 'source', selected: true, disabled: false},
    { name: 'Contact', valuePath: 'contact', selected: true, disabled: true},
    { name: 'Status', valuePath: 'status', selected: false, disabled: false},
    { name: 'PhNo', valuePath: 'phno', selected: true, disabled: false},
    { name: 'Subject', valuePath: 'subject', selected: false, disabled: false},
  ]);
  let rows = A([
    { source: 'FB', contact: 'Gandalf', phno: '913', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D' },
    { source: 'Twitter', contact: 'Severus', phno: '915', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'E' },
    { source: 'Call', contact: 'Alan', phno: '916', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'F' },
    { source: 'ABC', contact: 'Snape', phno: '917', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'G' },
    { source: 'WhatsApp', contact: 'Wheeler', phno: '918', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'H' },
    { source: 'ABC', contact: 'Joyce', phno: '919', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'I' },
    { source: 'Email', contact: 'Byers', phno: '920', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'J' },
    { source: 'FB', contact: 'El - Eleven', phno: '921', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'K' },
  ]);

  test('it yeilds basic table', async function(assert){
    this.set('tableRows', rows)
    this.set('tableColumns', columns)
    await render(hbs `
      {{#nucleus-table rows=tableRows columns=tableColumns
        as |table|}}
        {{table.table}}
      {{/nucleus-table}}
    `)
    assert.dom('.nucleus-table-container').exists({ count: 1}, 'Table container is rendered');
    assert.dom('.nucleus-table').exists({ count: 1}, 'Table component is rendered');
  });

  test('visual regression for table', async function(assert) {
    this.set('tableRows', A([ { source: 'FB', contact: 'Gandalf', phno: '913', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D' },
    { source: 'Twitter', contact: 'Severus', phno: '915', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'E' },
    { source: 'Call', contact: 'Alan', phno: '916', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'F' },
    { source: 'ABC', contact: 'Snape', phno: '917', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'G' },]))
    this.set('tableColumns', columns)
    await render(hbs `
      {{#nucleus-table rows=tableRows columns=tableColumns
        as |table|}}
        {{table.table}}
      {{/nucleus-table}}
    `)
    await backstop(assert, {scenario:{misMatchThreshold: 0.05}});
  });

  test('it does not yield table if there are no rows', async function(assert){
    this.set('emptyArray', A([]))
    this.set('tableColumns', columns)
    await render(hbs `
      {{#nucleus-table rows=emptyArray columns=tableColumns
        as |table|}}
        {{table.table}}
      {{/nucleus-table}}
    `)
    assert.dom('.nucleus-table-container').doesNotExist('Table container does not exist');
    assert.dom('.nucleus-table').doesNotExist('Table component does not exist');
  });

  test('filter can be disabled', async function(assert){
    this.set('tableRows', rows)
    this.set('tableColumns', columns)
    await render(hbs `
      {{#nucleus-table rows=tableRows columns=tableColumns canFilter=false
        as |table|}}
        {{table.table}}
      {{/nucleus-table}}
    `)
    assert.dom('.nucleus-table-container .filter-container').doesNotExist('Filter does not exist')
  });

  test('it passes a11y tests', async function(assert) {
    this.set('tableRows', rows)
    this.set('tableColumns', columns)
    await render(hbs `
      {{#nucleus-table rows=tableRows columns=tableColumns
        as |table|}}
        {{table.table}}
      {{/nucleus-table}}
    `)
   
    return a11yAudit(this.element).then(() => {
      assert.ok(true, 'no a11y errors found!');
    });
  });
});
