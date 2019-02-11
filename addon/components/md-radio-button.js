import {computed, observer} from '@ember/object';
import Component from '@ember/component';
import RipplesMixin from '../mixins/ripples';
import LayoutRules from '../mixins/layout-rules';

var MdRadioButton = Component.extend(LayoutRules, RipplesMixin, {

  attributeBindings: ['disabled'],

  classNameBindings: ['checked:md-checked'],

  tagName: 'md-radio-button',

  didInsertElement() {
    this._super(...arguments);
    this.get('rippleService').setupCheckbox(this, this.$('.md-container'));
  },

  checked: computed('value', 'selected', function () {
    return this.get('value') === this.get('selected');
  }),

  checkedDidChange: observer('checked', function () {
    if (this.get('checked')) {
      this.set('selected', this.get('value'));
    }
  }),

  click() {
    if (this.get('disabled')) {
      return;
    }

    this.set('selected', this.get('value'));
  }

});

export default MdRadioButton;
