import { classNames, attributeBindings, classNameBindings, tagName, layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import { computed } from '@ember/object';
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
  disabled = "false";

  /**
  * tabindex
  *
  * @field tabindex
  * @type String
  * @public
  */
  tabindex = "0";

  /**
  * role
  *
  * @field role
  * @type String
  * @public
  */
  role = "tabpanel"

  /**
  * isActive
  *
  * @field isActive
  * @type Boolean
  * @public
  */
  @computed('props.[]', function() {
    return (this.props.default === this.name);
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
    let tabList = this.props.tabListItems.findBy('name', this.name);
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
    once(this, this.props.registerPanel, {
      id: this.elementId,
      name: this.name,
      disabled: this.disabled
    });
  }
}

export default TabPanel;
