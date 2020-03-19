import Component from '@ember/component';
import { classNames, attributeBindings, classNameBindings, tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../../templates/components/nucleus-tabs/tab-list-item';
import { get, set, computed } from '@ember/object';
import defaultProp from '@freshworks/core/utils/default-decorator';
import { TABS_KEY_CODE } from '../../constants/nucleus-tabs'

/**
  __Usage:__

  [Refer component page](/docs/components/nucleus-tabs)

  @class Nucleus Tab List Item
  @namespace Components
  @extends Ember.Component
  @private
*/
@tagName('div')
@templateLayout(layout)
@classNames('nucleus-tabs__list__item')
@classNameBindings('isActive:is-active', 'isDisabled:is-disabled', 'isPressed:is-pressed')
@attributeBindings('isDisabled:disabled', 'tabindex', 'title', 'role', 'aria-controls', 'aria-selected')
class TabListItem extends Component {

  /**
  * disabled
  *
  * @field disabled
  * @type string
  * @default null
  * @readonly
  * @public
  */
  @defaultProp
  disabled = null;

  /**
  * controls
  *
  * @field controls
  * @description idref to what panel this tab item controls
  * @type string|null
  * @readonly
  * @public
  */
  @defaultProp
  controls;

  /**
  * selected
  *
  * @field selected
  * @description currently selected tab
  * @readonly
  * @public
  */
  @defaultProp
  selected;

  /**
  * tabOrder
  *
  * @field tabOrder
  * @description order in which tabs are displayed. Only first tabs will not have tabIndex value
  * @type number
  * @readonly
  * @public
  */
  @defaultProp
  tabOrder;

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
  * isPressed
  *
  * @field isPressed
  * @description to solve focus on click styling
  * @type boolean
  * @default false
  * @public
  */
  isPressed = false;

  /**
  * tabindex
  *
  * @field tabindex
  * @type string|null
  * @public
  */
  @computed('tabOrder', function() {
    let tabIndex = null;
    if(!get(this, 'isDisabled')) {
      tabIndex = (get(this, 'tabOrder') === 0)? '0' : '-1';
    }
    return tabIndex;
  })
  tabindex;

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
  * isDisabled
  *
  * @field isDisabled
  * @type boolean
  * @public
  */
  @computed('disabled', function() {
    return (get(this, 'disabled').toString() === 'true')? true : false;
  })
  isDisabled;

  /**
  * title
  *
  * @field title
  * @type string
  * @public
  */
  @computed('name', function() {
    return get(this, 'name');
  })
  title;

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
  'aria-controls';

  /**
  * aria-selected
  *
  * @field aria-selected
  * @type boolean
  * @public
  */
  @computed('selected', function() {
    return (get(this, 'selected') === get(this, 'name')).toString();
  })
  'aria-selected';

  /**
  * init
  *
  * @method init
  * @description lifecycle event
  * @public
  *
  */
  init() {
    super.init(...arguments);
  }

  /**
  * didInsertElement
  *
  * @method didInsertElement
  * @description lifecycle event
  * @public
  *
  */
  didInsertElement() {
    get(this, 'registerTabListItem').call(this, {
      id: get(this, 'elementId'),
      name: get(this, 'name')
    });
  }

  /**
  * mouseDown
  *
  * @method mouseDown
  * @description event handler : We are negating the style applied on click-focus
  * @public
  *
  */
  mouseDown() {
    if(get(this, 'isDisabled') === false) { 
      set(this, 'isPressed', true); 
    }
  }

  /**
  * focusOut
  *
  * @method focusOut
  * @description event handler : Removing style that was applied during press to negate focus
  * @public
  *
  */
  focusOut() {
    if(get(this, 'isPressed') === true) {
      set(this, 'isPressed', false);
    }
  }

  /**
  * click
  *
  * @method click
  * @description event handler
  * @public
  *
  */
  click(event) {
    if(get(this, 'isDisabled') === false) {
      get(this, 'handleActivateTab').call(this, get(this, 'name'), event);
    }
  }

  /**
  * keyDown
  *
  * @method keyDown
  * @description event handler
  * @public
  *
  */
  keyDown(event) {
    event.stopPropagation();
    const targetElement = event.target;
    const firstElement = targetElement.parentElement.firstElementChild;
    const lastElement = targetElement.parentElement.lastElementChild;

    const keyCode = TABS_KEY_CODE;
    switch (event.keyCode) {
      case keyCode.ENTER:
      case keyCode.SPACE:
        event.preventDefault();
        targetElement.click();
        break;
      case keyCode.END: 
        lastElement.focus();
        break;
      case keyCode.HOME: 
        firstElement.focus();
        break; 
      case keyCode.LEFT: 
        get(this, '_focusPreviousTab').call(this, targetElement);
        break;
      case keyCode.RIGHT: 
        get(this, '_focusNextTab').call(this, targetElement);
        break;
      default:
        break;
    }
  }

  /**
  * _focusNextTab
  * When last item, focus must circle back to previous item.
  *
  * @method _focusNextTab
  * @description focus the next tab that is not disabled
  * @private
  *
  */
  _focusNextTab(element, elementInFocus) {
    const nextElement = (element.nextElementSibling)? element.nextElementSibling : element.parentElement.firstElementChild;
    if(elementInFocus && (elementInFocus.id === nextElement.id)) {
      return;
    } else if(nextElement.getAttribute('tabindex') === null) {
      get(this, '_focusNextTab').call(this, nextElement, element);
    } else {
      nextElement.focus();
    }
  }

  /**
  * _focusPreviousTab
  * When first item, focus must go back to last item.
  *
  * @method _focusPreviousTab
  * @description focus the previous tab that is not disabled
  * @private
  *
  */
  _focusPreviousTab(element, elementInFocus) {
    const previousElement = (element.previousElementSibling)? element.previousElementSibling : element.parentElement.lastElementChild;
    if(elementInFocus && (elementInFocus.id === previousElement.id)) {
      return;
    } else if(previousElement.getAttribute('tabindex') === null) {
      get(this, '_focusPreviousTab').call(this, previousElement, element);
    } else {
      previousElement.focus();
    }
  }
}

export default TabListItem;
