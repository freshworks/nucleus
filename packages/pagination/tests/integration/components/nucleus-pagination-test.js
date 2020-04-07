import { module } from 'qunit';
import { setupRenderingTest, test } from 'ember-qunit';
import { A } from '@ember/array';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';
import backstop from 'ember-backstop/test-support/backstop';
import a11yAudit from 'ember-a11y-testing/test-support/audit';

module('Integration | Component | nucleus-pagination', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  let array = A(['Item A', 'Item B', 'Item C', 'Item D', 'Item E', 'Item F', 'Item G',
  'Item H', 'Item I', 'Item J', 'Item K', 'Item L', 'Item M', 'Item N', 'Item O', 'Item P'
  ]);

  test('it yields basic pagination and paginator', async function(assert) {
    this.set('recordsArray', array)
    await render(hbs `
      {{#nucleus-pagination records=recordsArray as |pagination|}}
        {{pagination.paginator}}
      {{/nucleus-pagination}}
    `)

    assert.dom('.nucleus-pagination').exists({ count: 1 }, 'Pagination is rendered');
    assert.dom('.nucleus-pagination .nucleus-paginator').exists({ count: 1 }, 'Paginator is also rendered');
  });

  test('it yields the mini paginator', async function(assert) {
    this.set('recordsArray', array)
    await render(hbs `
      {{#nucleus-pagination records=recordsArray as |pagination|}}
        {{pagination.paginator mini=true}}
      {{/nucleus-pagination}}
    `)
    
    assert.dom('.nucleus-pagination').exists({ count: 1 }, 'Pagination is rendered along with Paginator');
    assert.dom('.nucleus-pagination .nucleus-paginator__mini').exists({ count: 1 }, 'Mini Paginator is rendered.');
  });

  test('it does not render when there are no items', async function(assert) {
    let emptyArray = A([])
    this.set('emptyArray', emptyArray)
    await render(hbs `
      {{#nucleus-pagination records=emptyArray as |pagination|}}
        {{pagination.paginator}}
      {{/nucleus-pagination}}
    `)

    assert.dom('.nucleus-pagination .nucleus-paginator .nucleus-paginator__item').doesNotExist('Paginator does not exist');
  })

  test('visual regression for pagination', async function(assert) {
    this.set('recordsArray', array)
    await render(hbs `
      {{#nucleus-pagination records=recordsArray as |pagination|}}
        {{pagination.paginator}}
      {{/nucleus-pagination}}
      {{#nucleus-pagination records=recordsArray pageSize=5 as |pagination|}}
       {{pagination.paginator}}
      {{/nucleus-pagination}}
      {{#nucleus-pagination records=recordsArray pageSize=5 as |pagination|}}
       {{pagination.paginator hasPageNos=false}}
      {{/nucleus-pagination}}
      {{#nucleus-pagination records=recordsArray pageSize=5 as |pagination|}}
       {{pagination.paginator mini=true}}
      {{/nucleus-pagination}}
    `)
    await backstop(assert, {scenario:{misMatchThreshold: 0.1}});
  });

  test('it passes a11y tests', async function(assert) {
    this.set('recordsArray', array)
    await render(hbs `
      {{#nucleus-pagination records=recordsArray as |pagination|}}
        {{pagination.paginator}}
      {{/nucleus-pagination}}
    `)
   
    return a11yAudit(this.element).then(() => {
      assert.ok(true, 'no a11y errors found!');
    });
  });

});
