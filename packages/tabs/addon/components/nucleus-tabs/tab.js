import { classNames, classNameBindings, tagName, layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../../templates/components/nucleus-tabs/tab';

@tagName('div')
@templateLayout(layout)
@classNames('nucleus-tabs--panel')
@classNameBindings('isActive:active')
class Tab extends Component {

}

export default Tab;
