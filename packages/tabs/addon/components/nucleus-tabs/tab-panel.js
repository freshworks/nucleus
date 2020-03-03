import { classNames, attributeBindings, classNameBindings, tagName, layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import { get, computed } from '@ember/object';
import layout from '../../templates/components/nucleus-tabs/tab-panel';
import { once } from '@ember/runloop';
import defaultProp from '@freshworks/core/utils/default-decorator';

@tagName('div')
@templateLayout(layout)
@classNames('nucleus-tabs--panel')
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
  * @type String
  * @public
  */
  tabindex = '0';

  /**
  * role
  *
  * @field role
  * @type String
  * @public
  */
  role = 'tabpanel'

  /**
  * isActive
  *
  * @field isActive
  * @type Boolean
  * @public
  */
  @computed('props.[]', function() {
    return (get(this.props, 'currentSelected') === get(this, 'name'));
  })
  isActive;

  /**
  * isActive
  *
  * @field isActive
  * @type Boolean
  * @public
  */
  @computed('props.tabList.[]', function() {
    let tabListItems = get(this.props, 'tabListItems');
    let tabList = tabListItems.findBy('name', get(this, 'name'));
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
