import Component from '@ember/component';
import { classNames, attributeBindings, classNameBindings, tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../../templates/components/nucleus-tabs/tab-panel';
import { get, computed } from '@ember/object';
import defaultProp from '@freshworks/core/utils/default-decorator';
import { once } from '@ember/runloop';

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
@classNameBindings('isActive:active')
@attributeBindings('tabindex')
@attributeBindings('role')
@attributeBindings('aria-labelledby')
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
  @computed('props.[]', function() {
    return (get(this.props, 'currentSelected') === get(this, 'name'));
  })
  isActive;

  /**
  * aria-labelledby
  *
  * @field aria-labelledby
  * @type string
  * @public
  */
  @computed('props.tabList.[]', function() {
    const tabListItems = get(this.props, 'tabListItems');
    const tabList = tabListItems.findBy('name', get(this, 'name'));
    return (tabList)? tabList.id : "";
  })
  "aria-labelledby";

  /**
  * init : lifecycle event
  *
  * @method init
  * @public
  *
  */
  init() {
    super.init(...arguments);
    once(this, get(this.props, 'registerPanel'), {
      id: get(this, 'elementId'),
      name: get(this, 'name'),
      disabled: get(this, 'disabled')
    });
  }
}

export default TabPanel;
