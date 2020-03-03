import { classNames, attributeBindings, classNameBindings, tagName, layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import { get, computed } from '@ember/object';
import defaultProp from '@freshworks/core/utils/default-decorator';
import { once } from '@ember/runloop';
import layout from '../../templates/components/nucleus-tabs/tab-list-item';
import { TABS_KEY_CODE } from '../../constants/nucleus-tabs'

@tagName('button')
@templateLayout(layout)
@classNames('nucleus-tabs--list--item')
@classNameBindings('isActive:active')
@classNameBindings('isDisabled:disabled')
@attributeBindings('tabindex')
@attributeBindings('role')
@attributeBindings('aria-controls')
@attributeBindings('aria-selected')
class TabListItem extends Component {

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
  * controls : idref to what panel this tab item controls
  *
  * @field controls
  * @type string|null
  * @default null
  * @readonly
  * @public
  */
  @defaultProp
  controls;

  /**
  * role
  *
  * @field role
  * @type string
  * @default 'tab'
  * @public
  */
  role = 'tab';

  /**
  * tabindex
  *
  * @field tabindex
  * @type string|null
  * @public
  */
  @computed('index', function() {
    return (get(this, 'index') === 0)? null : '-1';
  })
  tabindex;

  /**
  * isActive
  *
  * @field isActive
  * @type boolean
  * @public
  */
  @computed('default', function() {
    return (get(this, 'default') === get(this, 'name'));
  })
  isActive;

  /**
  * isDisabled
  *
  * @field isDisabled
  * @type boolean
  * @public
  */
  @computed('disabled', function() {
    return (get(this, 'disabled') === 'true')? true : false;
  })
  isDisabled;

  /**
  * aria-controls
  *
  * @field aria-controls
  * @type string
  * @public
  */
  @computed('controls', function() {
    return get(this, 'controls');
  })
  "aria-controls";

  /**
  * aria-selected
  *
  * @field aria-selected
  * @type boolean
  * @public
  */
  @computed('default', function() {
    return (get(this, 'default') === get(this, 'name')).toString();
  })
  "aria-selected";

  /**
  * init : lifecycle event
  *
  * @method init
  * @public
  *
  */
  init() {
    super.init(...arguments);
    once(this, get(this, 'registerTabListItem'), {
      id: get(this, 'elementId'),
      name: get(this, 'name')
    });
  }

  /**
  * click : event handler
  *
  * @method click
  * @public
  *
  */
  click(event) {
    event.target.focus();
    if(get(this, 'disabled') === 'false') {
      this.handleActivateTab(get(this, 'name'), event);
    }
  }

  /**
  * keyDown : event handler
  *
  * @method keyDown
  * @public
  *
  */
  keyDown(event) {
    event.stopPropagation();
    let target = event.target;
    let nextSibling = target.nextElementSibling;
    let previousSibling = target.previousElementSibling;
    let firstElement = target.parentElement.firstElementChild;
    let lastElement = target.parentElement.lastElementChild;

    const keyCode = TABS_KEY_CODE;
    switch (event.keyCode) {
      case (keyCode.ENTER || keyCode.SPACE):
        target.click();
        break;
      case keyCode.END: 
        lastElement.focus();
        break;
      case keyCode.HOME: 
        firstElement.focus();
        break; 
      case keyCode.LEFT: 
        (previousSibling)? previousSibling.focus() : lastElement.focus();
        break;
      case keyCode.RIGHT: 
        (nextSibling)? nextSibling.focus() : firstElement.focus();
        break;
      default:
        break;
    }
  }
}

export default TabListItem;
