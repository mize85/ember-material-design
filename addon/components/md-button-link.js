import Component from '@ember/component';
import LayoutRules from '../mixins/layout-rules';


var MdButtonLink = Component.extend(LayoutRules, {
  tagName: 'a',

  classNames: ['md-button']
});

export default MdButtonLink;
