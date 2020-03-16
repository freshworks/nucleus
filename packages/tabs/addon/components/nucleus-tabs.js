import Component from '@ember/component';
import { classNames, classNameBindings, layout as templateLayout } from '@ember-decorators/component';
import layout from '../templates/components/nucleus-tabs';
import { set, get, computed, action } from '@ember/object';
import defaultProp from '@freshworks/core/utils/default-decorator';
import { A } from '@ember/array';
import { oneWay }from '@ember/object/computed';

/**
  __Usage:__

  [Refer component page](/docs/components/nucleus-tabs)

  @class Nucleus Tabs
  @namespace Components
  @extends Ember.Component
  @public
*/
@templateLayout(layout)
@classNames('nucleus-tabs')
@classNameBindings('variantClass')
@classNameBindings('customClasses')
class NucleusTabs extends Component {
  /**
  * description
  *
  * @field description
  * @description to add aria label
  * @type string|null
  * @default null
  * @readonly
  * @public
  */
  @defaultProp
  description = null;

  /**
  * customClasses
  *
  * @field customClasses
  * @description to add custom class to the tabs component
  * @type string
  * @readonly
  * @public
  */
  @defaultProp 
  customClasses = '';

  /**
  * select
  *
  * @field select
  * @description default open tab 
  * @type string|null
  * @default null
  * @readonly
  * @public
  */
  @defaultProp
  select = null;

  /**
  * variant
  *
  * @field variant
  * @description tab styles, line/background
  * @type string
  * @default 'line'
  * @readonly
  * @public
  */
  @defaultProp
  variant = 'line';

  /**
  * tabPanels
  *
  * @field tabPanels
  * @description Collection of all tab panels
  * @type array
  * @public
  */
  tabPanels = A([]);

  /**
  * tabListItems
  *
  * @field tabListItems
  * @description Collection of all tab list items
  * @type array
  * @public
  */
  tabListItems = A([]);

  /**
  * selected
  *
  * @field selected
  * @description takes intial value from select
  * @type string|null
  * @public
  */
  @oneWay('select')
  selected;

  /**
  * variantClass
  *
  * @field variantClass
  * @type string
  * @public
  */
  @computed('variant', function() {
    return 'nucleus-tabs--' + get(this, 'variant');
  })
  variantClass;

  /**
  * registerPanel
  *
  * @method registerPanel
  * @param {Object} tab
  * @public
  *
  */
  @action
  registerPanel(tab) {
    if(!get(this, 'selected') && (tab.disabled === 'false')) set(this, 'selected', tab.name); // set selected if not initially set
    get(this, 'tabPanels').pushObject(tab);
  }

  /**
  * registerTabListItem 
  *
  * @method registerTabListItem
  * @param {Object} tab
  * @public
  *
  */
  @action
  registerTabListItem(tabList) {
    get(this, 'tabListItems').pushObject(tabList);
  }

  /**
  * activateTab
  *
  * @method activateTab
  * @description Handler that will be called when a tab is clicked
  * @param {string} name
  * @param {any} event
  * @public
  *
  */
  @action
  async activateTab(changedTo, event) {
    const _this = this;
    const beforeChange = get(_this, 'beforeChange');
    const onChange =  get(_this, 'onChange');
    const currentTab = get(_this, 'selected');
    if(beforeChange) await beforeChange.call(_this, changedTo, currentTab, event);
    set(_this, 'selected', changedTo);
    if(onChange) await onChange.call(_this, changedTo, currentTab, event);
  }
}

export default NucleusTabs;
