import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { classNames, tagName, classNameBindings, layout as templateLayout } from '@ember-decorators/component';
import { notEmpty } from '@ember/object/computed';
import layout from '../../templates/components/nucleus-modal/footer';

/**
  Footer Usage:
  @class Footer
  @namespace Components
  @extends Ember.Component
  @public
*/
@classic
@templateLayout(layout)
@tagName('form')
@classNames('nucleus-modal__footer')
@classNameBindings('isSticky:sticky')
class Footer extends Component{
  /**
  * closeTitle
  *
  * @field closeTitle
  * @type null
  * @public
  */
  closeTitle = null;

  /**
  * isSticky
  *
  * @field isSticky
  * @type boolean
  * @public
  */
 isSticky = true;

  /**
  * hasCloseButton
  *
  * @field hasCloseButton
  * @type function
  * @private
  */
  @notEmpty('closeTitle')
  hasCloseButton;

  /**
  * submitTitle
  *
  * @field submitTitle
  * @type null
  * @public
  */
  submitTitle = null;

  /**
  * hasSubmitButton
  *
  * @field hasSubmitButton
  * @type function
  * @private
  */
  @notEmpty('submitTitle')
  hasSubmitButton;

  /**
  * submitDisabled
  *
  * @field submitDisabled
  * @type boolean
  * @public
  */
  submitDisabled = false;

  /**
  * type
  *
  * @field type
  * @type string
  * @public
  */
  type = 'primary';

  /**	
   * The action to send to the parent modal component when the modal footer's form is submitted	
   *	
   * @event onSubmit	
   * @public	
   */	
  onSubmit = () => {}	


  /**	
   * The action to send to the parent modal component when the modal footer's form is closed	
   * 
   * @event onClose	
   * @public	
   */	
  onClose = () => {}
}

export default Footer;