import { module } from 'qunit';
import { helper } from '@ember/component/helper';
import { setupRenderingTest } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';
import hbs from 'htmlbars-inline-precompile';
import { render, click } from '@ember/test-helpers';
import { add, parseDate, formatDate } from 'ember-power-calendar-utils';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
import backstop from 'ember-backstop/test-support/backstop';
import setupDatepicker from '../../helpers/setup-datepicker';

let sampleTemplate = hbs`
  {{nucleus-datepicker-range}}
`;

let sampleActionTemplate = hbs`
  {{nucleus-datepicker-range onUpdate=(action "onUpdate") onCancel=(action "onCancel")}}
`;

let samplePropTemplate = hbs`
  {{nucleus-datepicker-range initialStartDate="1 Apr, 2020" initialEndDate="4 April, 2020"}}
`;

let sampleInputTemplate = hbs`
  {{nucleus-datepicker-range-input onUpdate=(action "onUpdate")}}
`;

let stubFormatDateHelper = helper((args) => {
  return formatDate(args[0], args[1], args[2]);
});

module('Integration | Component | nucleus-datepicker-range', function(hooks) {
  setupRenderingTest(hooks);
  setupDatepicker(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
    this.owner.register('helper:format-date', stubFormatDateHelper);
  });

  test('it should render the calendar component', async function(assert) {
    await render(sampleTemplate);
    assert.dom('.nucleus-datepicker').exists({ count: 1 }, 'Datepicker component exists.');
    assert.dom('.nucleus-datepicker .nucleus-datepicker__header').exists({ count: 1 }, 'Datepicker has a header component');
    assert.dom('.nucleus-datepicker .nucleus-datepicker__calendar').exists({ count: 1 }, 'Datepicker has a calendar component');
    assert.dom('.nucleus-datepicker .nucleus-datepicker__footer').exists({ count: 1 }, 'Datepicker has a footer component');
  });

  test('it should pick start date and end date correctly', async function (assert) {
    await render(sampleTemplate);
    await click('.nucleus-datepicker .ember-power-calendar-day--today');
    let parsedStartDate = parseDate(document.querySelector('.ember-power-calendar-day--range-start').dataset.date, 'yyyy-MM-dd', 'en');
    let parsedEndDate = add(parsedStartDate, 3, 'day');
    let selectorEndDate = formatDate(parsedEndDate, 'yyyy-MM-dd', 'en'); 
    await click(`.nucleus-datepicker .ember-power-calendar-day[data-date="${selectorEndDate}"]`);
    assert.dom('.ember-power-calendar-day--current-month.ember-power-calendar-day--range-start').exists({count: 1}, 'Date picker start date selected');
    assert.dom('.ember-power-calendar-day--current-month.ember-power-calendar-day--range-end').exists({count: 1}, 'Date picker end date selected');
  });

  test('it should have the right value in Input when start and end dates are selected', async function (assert) {
    await render(sampleTemplate);
    await click('.nucleus-datepicker .ember-power-calendar-day--today');
    let parsedStartDate = parseDate(document.querySelector('.ember-power-calendar-day--range-start').dataset.date, 'yyyy-MM-dd', 'en');
    let formattedStartDate = formatDate(parsedStartDate, 'd MMM, yyyy', 'en');
    let parsedEndDate = add(parsedStartDate, 3, 'day');
    let formattedEndDate = formatDate(parsedEndDate, 'd MMM, yyyy', 'en');
    let selectorEndDate = formatDate(parsedEndDate, 'yyyy-MM-dd', 'en'); 
    await click(`.nucleus-datepicker .ember-power-calendar-day[data-date="${selectorEndDate}"]`);
    assert.equal(
      document.querySelector('.nucleus-datepicker input').value,
      (formattedStartDate + ' to ' + formattedEndDate),
      'Input value matches the selected dates value'
    );
  });

  test('it should change start and end dates when input value is changed', async function(assert) {
    await render(samplePropTemplate);
    await click('.nucleus-datepicker .ember-power-calendar-day--current-month:first-child');
    let parsedStartDate = parseDate(document.querySelector('.ember-power-calendar-day--range-start').dataset.date, 'yyyy-MM-dd', 'en');
    let parsedEndDate = add(parsedStartDate, 3, 'day');
    let selectorEndDate = formatDate(parsedEndDate, 'yyyy-MM-dd', 'en'); 
    await click(`.nucleus-datepicker .ember-power-calendar-day[data-date="${selectorEndDate}"]`);

    let changedParsedStartDate = add(parsedStartDate, 1, "month");
    let changedFormattedStartDate = formatDate(changedParsedStartDate, 'd MMM, yyyy', 'en');
    let changedSelectorStartDate = formatDate(changedParsedStartDate, 'yyyy-MM-dd', 'en');

    let changedParsedEndDate = add(parsedEndDate, 1, "month");
    let changedFormattedEndDate = formatDate(changedParsedEndDate, 'd MMM, yyyy', 'en');
    let changedSelectorEndDate = formatDate(changedParsedEndDate, 'yyyy-MM-dd', 'en');

    document.querySelector('.nucleus-datepicker input').value = (changedFormattedStartDate + ' to ' + changedFormattedEndDate);
    document.querySelector('.nucleus-datepicker input').dispatchEvent(new Event('change', { bubbles: true }));

    assert.equal(
      document.querySelector('.ember-power-calendar-day--range-start').dataset.date,
      changedSelectorStartDate,
      'Start date changed'
    );

    assert.equal(
      document.querySelector('.ember-power-calendar-day--range-end').dataset.date,
      changedSelectorEndDate,
      'End date changed'
    );
  });

  test('it should call the update callback when update button is pressed', async function(assert) {
    let onUpdateAction = this.spy();
    this.actions.onUpdate = onUpdateAction;
    let onCancelAction = this.spy();
    this.actions.onCancel = onCancelAction;
    await render(sampleActionTemplate);
    await click('.nucleus-datepicker button[aria-label="Update"]');
    assert.ok(onUpdateAction.calledOnce, 'onUpdate action has been called.');
  });

  test('it should call the cancel callback when cancel button is pressed', async function(assert) {
    let onUpdateAction = this.spy();
    this.actions.onUpdate = onUpdateAction;
    let onCancelAction = this.spy();
    this.actions.onCancel = onCancelAction;
    await render(sampleActionTemplate);
    await click('.nucleus-datepicker button[aria-label="Cancel"]');
    assert.ok(onCancelAction.calledOnce, 'onCancel action has been called.');
  });

  test('it has accessibility attributes', async function(assert) {
    await render(sampleTemplate);
    assert.dom('.nucleus-datepicker input').hasAttribute('aria-label');
    assert.dom('.nucleus-datepicker .nucleus-datepicker__navigation__select span.visually-hidden').hasAttribute('aria-label');
    assert.dom('.nucleus-datepicker .nucleus-datepicker__navigation__select select:first-child').hasAttribute('aria-label');
    assert.dom('.nucleus-datepicker .nucleus-datepicker__navigation__select select:last-child').hasAttribute('aria-label');
    assert.dom('.nucleus-datepicker .nucleus-datepicker__navigation__arrows .nucleus-button:first-child').hasAttribute('aria-label');
    assert.dom('.nucleus-datepicker .nucleus-datepicker__navigation__arrows .nucleus-button:last-child').hasAttribute('aria-label');
    assert.dom('.nucleus-datepicker .nucleus-datepicker__footer .nucleus-button:first-child').hasAttribute('aria-label');
    assert.dom('.nucleus-datepicker .nucleus-datepicker__footer .nucleus-button:last-child').hasAttribute('aria-label');
  });

  test('it passes a11y tests', async function(assert) {
    await render(sampleTemplate);

    let axeOptions = {
      rules: {
        'color-contrast': {
          enabled: false
        }
      }
    };

    return a11yAudit(this.element, axeOptions).then(() => {
      assert.ok(true, 'no a11y errors found!');
    });
  });

  test('visual regression for the nucleus-calendar', async function(assert) {
    await render(samplePropTemplate);
    await backstop(assert, {
      scenario: {
        misMatchThreshold: 0.1,
        delay: 2000
      }
    });
  });

  test('visual regression for the nucleus-calendar-input', async function(assert) {
    let onUpdateAction = this.spy();
    this.actions.onUpdate = onUpdateAction;
    await render(sampleInputTemplate);
    await click('.nucleus-datepicker__input input');
    await backstop(assert, {
      scenario: {
        misMatchThreshold: 0.1,
        delay: 2000
      }
    });
  });

});
