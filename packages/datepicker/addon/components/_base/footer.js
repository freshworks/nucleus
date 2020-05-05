import { classNames, layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import defaultProp from '@freshworks/core/utils/default-decorator';
import layout from "../../templates/components/_base/footer";
import { get, action } from '@ember/object';

@templateLayout(layout)
@classNames('nucleus-datepicker__footer')
class FooterBase extends Component {

  /**
  * locale
  *
  * @field locale
  * @type string
  * @default 'en'
  * @readonly
  * @public
  */
  @defaultProp
  locale = 'en';

  /**
  * OnUpdateClick
  *
  * @method OnUpdateClick
  * @public
  *
  */
  @action
  OnUpdateClick() {
    get(this, 'onUpdate').call(this);
  }

  /**
  * onCancelClick
  *
  * @method onCancelClick
  * @public
  *
  */
  @action
  onCancelClick() {
    get(this, 'onCancel').call(this);
  }

}

export default FooterBase;
