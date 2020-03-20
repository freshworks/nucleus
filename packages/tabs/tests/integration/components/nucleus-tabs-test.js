import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import backstop from 'ember-backstop/test-support/backstop';

let sampleTabsTemplate = hbs`
  {{#nucleus-tabs description="site-navigation" select="home" variant="background" as |tabs|}}
    {{#tabs.panel name="home" }}
      <div>This is the home section</div>
    {{/tabs.panel}}
    {{#tabs.panel name="about" }}
      <div>This is about us section</div>
    {{/tabs.panel}}
    {{#tabs.panel name="contact" }}
      <div>This is the contact section</div>
    {{/tabs.panel}}
  {{/nucleus-tabs}}
`;

module('Integration | Component | nucleus-tabs', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('it should yield tab-list items and tab-panels', async function(assert) {
    await render(sampleTabsTemplate);
    assert.dom('.nucleus-tabs').exists({ count: 1 }, 'Tabs component exists.');
    assert.dom('.nucleus-tabs .nucleus-tabs__list').exists({ count: 1 }, 'Tabs component has a Tab list');
    assert.dom('.nucleus-tabs .nucleus-tabs__list__item').exists({ count: 3 }, 'Tabs component has 3 Tab list items');
    assert.dom('.nucleus-tabs .nucleus-tabs__panel').exists({ count: 3 }, 'Tabs component has right number of Tab panels');
  });

  test('it should have only selected panel as active', async function(assert) {
    await render(sampleTabsTemplate);
    assert.dom('.nucleus-tabs .nucleus-tabs__panel.is-active').exists({ count: 1 }, 'Only one active panel at a time');
    assert.dom('.nucleus-tabs .nucleus-tabs__panel.is-active').hasText('This is the home section');
  });

  test('it should have only selected tab list item as active', async function(assert) {
    await render(sampleTabsTemplate);
    assert.dom('.nucleus-tabs .nucleus-tabs__list__item.is-active').exists({ count: 1 }, 'Only one active panel at a time');
    assert.dom('.nucleus-tabs .nucleus-tabs__list__item.is-active').hasText('home');
  });

  test('it should attach appropriate background class for the background variant', async function(assert) {
    await render(sampleTabsTemplate);
    assert.dom('.nucleus-tabs.nucleus-tabs--background').exists({ count: 1 }, 'Has one appropriate class when passing variant as prop');
  });

  test('it should attach appropriate line class for the line variant', async function(assert) {
    await render(hbs`
      {{#nucleus-tabs description="site-navigation" select="home" as |tabs|}}
        {{#tabs.panel name="home" }}
          <div>This is the home section</div>
        {{/tabs.panel}}
      {{/nucleus-tabs}}
    `);
    assert.dom('.nucleus-tabs.nucleus-tabs--line').exists({ count: 1 }, 'Has line class when no variant passed as prop');
  });

  test('it should attach disable class to disabled tab list item', async function(assert) {
    await render(hbs`
      {{#nucleus-tabs description="site-navigation" select="home" as |tabs|}}
        {{#tabs.panel name="home" }}
          <div>This is the home section</div>
        {{/tabs.panel}}
        {{#tabs.panel name="about" disabled="true" }}
          <div>This is the home section</div>
        {{/tabs.panel}}
      {{/nucleus-tabs}}
    `);
    assert.dom('.nucleus-tabs .nucleus-tabs__list__item.is-disabled').exists({ count: 1 }, 'Has disabled class when disabled prop is passed');
  });

  test('it should not enable tab when tab list item is disabled', async function(assert) {
    await render(hbs`
      {{#nucleus-tabs description="site-navigation" select="home" as |tabs|}}
        {{#tabs.panel name="home" }}
          <div>This is the home section</div>
        {{/tabs.panel}}
        {{#tabs.panel name="about" disabled="true" }}
          <div>This is the home section</div>
        {{/tabs.panel}}
      {{/nucleus-tabs}}
    `);
    await click('.nucleus-tabs .nucleus-tabs__list__item:not(.is-active)');
    assert.dom('.nucleus-tabs .nucleus-tabs__list__item.is-active').hasText('home');
  });

  test('it should yeilds onChange action', async function(assert) {
    let onChangeAction = this.spy();
    this.actions.onChange = onChangeAction;
    await render(hbs`
      {{#nucleus-tabs description="site-navigation" select="home" onChange=(action "onChange") as |tabs|}}
        {{#tabs.panel name="home" }}
          <div>This is the home section</div>
        {{/tabs.panel}}
        {{#tabs.panel name="about" }}
          <div>This is the about section</div>
        {{/tabs.panel}}
      {{/nucleus-tabs}}
    `);

    await click('.nucleus-tabs .nucleus-tabs__list__item:not(.is-active)');
    assert.ok(onChangeAction.calledOnce, 'onChange action has been called.');
  });

  test('it should yeilds beforeChange action', async function(assert) {
    let beforeChangeAction = this.spy();
    this.actions.beforeChange = beforeChangeAction;
    await render(hbs`
      {{#nucleus-tabs description="site-navigation" select="home" beforeChange=(action "beforeChange") as |tabs|}}
        {{#tabs.panel name="home" }}
          <div>This is the home section</div>
        {{/tabs.panel}}
        {{#tabs.panel name="about" }}
          <div>This is the about section</div>
        {{/tabs.panel}}
      {{/nucleus-tabs}}
    `);

    await click('.nucleus-tabs .nucleus-tabs__list__item:not(.is-active)');
    assert.ok(beforeChangeAction.calledOnce, 'beforeChange action has been called.');
  });

  test('it should call beforeChange action ahead of onChange action', async function(assert) {
    let beforeChangeAction = this.spy(function() {
      assert.step('beforeChange');
    });
    this.actions.beforeChange = beforeChangeAction;
    let onChangeAction = this.spy(function() {
      assert.step('onChange');
    });
    this.actions.onChange = onChangeAction;
    await render(hbs`
      {{#nucleus-tabs description="site-navigation" select="home" beforeChange=(action "beforeChange") onChange=(action "onChange") as |tabs|}}
        {{#tabs.panel name="home" }}
          <div>This is the home section</div>
        {{/tabs.panel}}
        {{#tabs.panel name="about" }}
          <div>This is the about section</div>
        {{/tabs.panel}}
      {{/nucleus-tabs}}
    `);

    await click('.nucleus-tabs .nucleus-tabs__list__item:not(.is-active)');
    assert.ok(beforeChangeAction.calledOnce, 'beforeChange action has been called.');
    assert.ok(onChangeAction.calledOnce, 'beforeChange action has been called.');
    assert.verifySteps(['beforeChange', 'onChange']);
  });

  test('it has accessibility attributes', async function(assert) {
    await render(sampleTabsTemplate);
    assert.dom('.nucleus-tabs .nucleus-tabs__list').hasAttribute('role', 'tablist');
    assert.dom('.nucleus-tabs .nucleus-tabs__list').hasAttribute('aria-label', 'site-navigation');
    assert.dom('.nucleus-tabs .nucleus-tabs__list .nucleus-tabs__list__item').hasAttribute('role', 'tab');
    assert.dom('.nucleus-tabs .nucleus-tabs__list .nucleus-tabs__list__item.is-active').hasAttribute('aria-selected', 'true');
    assert.dom('.nucleus-tabs .nucleus-tabs__list .nucleus-tabs__list__item:not(.is-active)').hasAttribute('aria-selected', 'false');
    assert.dom('.nucleus-tabs .nucleus-tabs__list .nucleus-tabs__list__item').hasAttribute('aria-controls');
    assert.dom('.nucleus-tabs .nucleus-tabs__panel').hasAttribute('role', 'tabpanel');
    assert.dom('.nucleus-tabs .nucleus-tabs__panel').hasAttribute('aria-labelledby');
  });

  test('it passes a11y tests', async function(assert) {
    await render(sampleTabsTemplate);

    return a11yAudit(this.element).then(() => {
      assert.ok(true, 'no a11y errors found!');
    });
  });
  
  test('visual regression for the different variants - default, background, disabled', async function(assert) {
    await render(hbs`
      <div>Default:</div>
      {{#nucleus-tabs description="site-navigation" select="home" as |tabs|}}
        {{#tabs.panel name="home" }}
          <div>This is the home section</div>
        {{/tabs.panel}}
      {{/nucleus-tabs}}
      <div>With background:</div>
      {{#nucleus-tabs description="site-navigation" variant="background" select="home" as |tabs|}}
        {{#tabs.panel name="home" }}
          <div>This is the home section</div>
        {{/tabs.panel}}
      {{/nucleus-tabs}}
      <div>With disabled:</div>
      {{#nucleus-tabs description="site-navigation" variant="background" select="home" as |tabs|}}
        {{#tabs.panel name="home" }}
          <div>This is the home section</div>
        {{/tabs.panel}}
        {{#tabs.panel name="about" disabled="true" }}
          <div>This is the home section</div>
        {{/tabs.panel}}
      {{/nucleus-tabs}}
    `);
    await backstop(assert, {scenario:{misMatchThreshold: 0.001}}); 
  });
});
