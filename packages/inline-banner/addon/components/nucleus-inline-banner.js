import defaultProp from '@freshworks/core/utils/default-decorator';
import { classNames, attributeBindings, classNameBindings, layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import { set, action } from '@ember/object';
import { computed } from '@ember/object';
import layout from '../templates/components/nucleus-inline-banner';
import { ICON_MAP } from '../constants/nucleus-inline-banner';

/**
  __Usage:__
  [Refer component page](/docs/components/nucleus-inline-banner)

  @class Nucleus Inline Banner
  @namespace Components
  @extends Ember.Component
  @public
*/
@templateLayout(layout)
@classNames('nucleus-inline-banner')
@classNameBindings('_typeClass', '_isOpen:show:hide')
@attributeBindings('data-test-id')
class NucleusInlineBanner extends Component {
  /**
  * data-test-id
  *
  * @field data-test-id
  * @type string
  * @private
  */
  'data-test-id' = 'nucleus-inline-banner';

  /**
  * Type of the inline banner.
  * [`info`, `success`, `warning`, `danger`]
  *
  * @field type
  * @type string
  * @public
  * @default `info`
  */
  @defaultProp
  type = 'info';

  /**
  * Show or hide the close button
  *
  * @field isDismissible
  * @type boolean
  * @public
  * @default true
  */
  @defaultProp
  isDismissible = true;

  /**
  * Open/close state management
  *
  * @field _isOpen
  * @type boolean
  * @private
  */
  _isOpen = true;

  /**
  * Title of the banner. Can be plain text or HTML.
  *
  * @field title
  * @type string
  * @public
  */
  @defaultProp
  title = null;

  /**
  * _title
  *
  * @computed _title
  * @private
  */
  @computed('title', function () {
    return this.get('title');
  })
  _title;

  /**
  * _typeClass
  *
  * @computed _typeClass
  * @private
  */
  @computed('type', '_isOpen', function () {
    let type = this.get('type');
    let _isOpen = this._isOpen;
    return type && _isOpen ? `nucleus-inline-banner--${type}` : null;
  })
  _typeClass;

  /**
  * _icon
  *
  * @computed _icon
  * @private
  */
  @computed('type', function () {
    let iconType = this.get('type');
    return (iconType in ICON_MAP) ? ICON_MAP[iconType] : null;
  })
  _icon;

  /**
  * Closure action that gets invoked on clicking the close button.
  *
  * @method onClose
  * @public
  */
  @defaultProp
  onClose;

  /**
  * The action that gets invoked on clicking the close button.
  *
  * @method onCloseTip
  * @public
  *
  */
  @action
  onCloseTip() {
    if (this.get('onClose')) {
      set(this, '_isOpen', false);
      return this.get('onClose')();
    }

    set(this, '_isOpen', false);
  }
}

export default NucleusInlineBanner;
