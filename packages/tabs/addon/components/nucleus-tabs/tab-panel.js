import Component from '@ember/component';
import { classNames, attributeBindings, classNameBindings, tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../../templates/components/nucleus-tabs/tab-panel';
import { get, computed } from '@ember/object';
import defaultProp from '@freshworks/core/utils/default-decorator';

/**
  __Usage:__

  [Refer component page](/docs/components/nucleus-tabs)

  @class Nucleus Tab Panel
  @namespace Components
  @extends Ember.Component
  @public
*/
@tagName('div')
@templateLayout(layout)
@classNames('nucleus-tabs__panel')
@classNameBindings('isActive:is-active')
@attributeBindings('tabindex', 'role', 'aria-labelledby', 'testId:data-test-panel-id')
class TabPanel extends Component {

  /**
  * disabled
  *
  * @field disabled
  * @type string
  * @default 'false'
  * @readonly
  * @public
  */
  @defaultProp
  disabled = 'false';

  /**
  * testId
  *
  * @field testId
  * @type string|null
  * @default null
  * @readonly
  * @public
  */
  @defaultProp
  testId = null;

  /**
  * tabindex
  *
  * @field tabindex
  * @default '0'
  * @type string
  * @public
  */
  tabindex = '0';

  /**
  * role
  *
  * @field role
  * @type string
  * @public
  */
  role = 'tabpanel'

  /**
  * isActive
  *
  * @field isActive
  * @type boolean
  * @public
  */
  @computed('selected', function() {
    return (get(this, 'selected') === get(this, 'name'));
  })
  isActive;

  /**
  * aria-labelledby
  *
  * @field aria-labelledby
  * @type string
  * @public
  */
  @computed('tabListItems.[]', function() {
    const tabListItems = get(this, 'tabListItems');
    const tabList = tabListItems.findBy('name', get(this, 'name'));
    return (tabList)? tabList.id : '';
  })
  'aria-labelledby';

  /**
  * data-test-pane-id
  *
  * @field data-test-pane-id
  * @type string
  * @public
  */
  @computed('testId', function() {
    return get(this, 'testId');
  })
  'data-test-panel-id';

  /**
  * didInsertElement
  *
  * @method didInsertElement
  * @description lifecycle event
  * @public
  *
  */
  didInsertElement() {
    get(this, 'registerPanel').call(this, {
      id: get(this, 'elementId'),
      name: get(this, 'name'),
      disabled: get(this, 'disabled'),
      testId: get(this, 'testId')
    });
  }
}

export default TabPanel;
