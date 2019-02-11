import {htmlSafe} from '@ember/string';
import {computed} from '@ember/object';
import {alias} from '@ember/object/computed';
import Component from '@ember/component';
import LayoutRules from '../mixins/layout-rules';

var MdTabItem = Component.extend(LayoutRules, {
  tagName: 'md-tab-item',

  attributeBindings: ['tab', 'role', 'label', 'tabWidthStyle:style'],
  classNameBindings: ['isActive:md-active', 'isFocused:md-focus', 'isDisabled:md-disabled'],

  tabWrapperComponent: alias('parentView'),
  tabsComponent: alias('tabWrapperComponent.parentView'),

  tabWidth: null,

  didInsertElement() {
    this._super(...arguments);
    this.get('tabsComponent').attachRipple(this.$());
  },

  click() {
    this.get('tabsComponent').select(this.get('tab').getIndex());
  },

  tabWidthStyle: computed('tabWidth', function () {
    var tabWidth = this.get('tabWidth');

    if (tabWidth) {
      return new htmlSafe(`max-width: ${tabWidth}px;`);
    }

    return new htmlSafe('max-width: none;');
  }),

  isActive: computed('tabsComponent.selectedIndex', function () {
    return this.get('tab').isActive();
  }),

  isFocused: computed('tabsComponent.selectedIndex', function () {
    return this.get('tab').hasFocus();
  }),

  isDisabled: computed('tab.disabled', function () {
    return this.get('tab.disabled');
  })

});

export default MdTabItem;
