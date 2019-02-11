import {htmlSafe} from '@ember/string';
import {computed} from '@ember/object';
import {inject as service} from '@ember/service';
import Component from '@ember/component';
import LayoutRules from '../mixins/layout-rules';

function makeTransform(value) {
  var scale = value / 100;
  var translateX = (value - 100) / 2;
  return 'translateX(' + translateX.toString() + '%) scale(' + scale.toString() + ', 1)';
}

var MdProgressLinear = Component.extend(LayoutRules, {

  isInserted: false,

  init() {
    this._super(...arguments);
    this.setupTransforms();
  },

  didInsertElement() {
    this._super(...arguments);

    this.set('isInserted', true);
    this.$('.md-container').addClass('md-ready');
  },

  constants: service('constants'),

  tagName: 'md-progress-linear',

  attributeBindings: ['md-mode', 'md-buffer-value'],

  transforms: new Array(101),

  setupTransforms() {
    for (var i = 0; i < 101; i++) {
      this.transforms[i] = makeTransform(i);
    }

  },

  bar1Style: computed('clampedBufferValue', function () {
    return new htmlSafe(this.get('constants.CSS.TRANSFORM') + ': ' + this.transforms[this.get('clampedBufferValue')]);
  }),

  bar2Style: computed('clampedValue', function () {

    if (this.get('md-mode') === 'query') {
      return new htmlSafe('');
    }

    return new htmlSafe(this.get('constants.CSS.TRANSFORM') + ': ' + this.transforms[this.get('clampedValue')]);
  }),

  clampedValue: computed('value', function () {

    var value = this.get('value');
    if (value > 100) {
      return 100;
    }

    if (value < 0) {
      return 0;
    }

    return Math.ceil(value || 0);
  }),

  clampedBufferValue: computed('md-buffer-value', function () {
    var value = this.get('md-buffer-value');
    if (value > 100) {
      return 100;
    }

    if (value < 0) {
      return 0;
    }

    return Math.ceil(value || 0);
  })

});

export default MdProgressLinear;

