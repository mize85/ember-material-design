import Component from '@ember/component';
import LayoutRules from '../mixins/layout-rules';

var MdToolbar = Component.extend(LayoutRules, {
  tagName: ['md-toolbar'],

  shrinkSpeedFactor: 0.5,

  setupScrollShrink: function () {
  }
});

export default MdToolbar;
