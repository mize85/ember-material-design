import {htmlSafe} from '@ember/string';
import {computed} from '@ember/object';
import {inject as service} from '@ember/service';
import Component from '@ember/component';
import LayoutRules from '../mixins/layout-rules';

var MdProgressCircular = Component.extend(LayoutRules, {
  constants: service('constants'),

  tagName: 'md-progress-circular',

  attributeBindings: ['value', 'md-mode'],

  mdDiameter: 48,

  scale: computed('mdDiameter', function () {
    return this.get('mdDiameter') / 48;
  }),

  clampedValue: computed('value', function () {

    var value = this.get('value');

    return Math.max(0, Math.min(value || 0, 100));

  }),

  circleStyle: computed('scale', function () {
    return htmlSafe(this.get('constants.CSS.TRANSFORM') + ': ' + 'scale(' + this.get('scale').toString() + ')');
  })

});

export default MdProgressCircular;
