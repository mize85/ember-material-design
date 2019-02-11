import Component from '@ember/component';
import LayoutRules from '../mixins/layout-rules';

var MdTabContentWrapper = Component.extend(LayoutRules, {
  tagName: 'md-tabs-content-wrapper'
});

export default MdTabContentWrapper;
