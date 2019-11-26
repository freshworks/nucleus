import classic from 'ember-classic-decorator';
import { classNames, layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../../templates/components/nucleus-modal/body';

@classic
@templateLayout(layout)
@classNames('nucleus-modal__body')
class Body extends Component {}

export default Body;