import {computed, observer} from '@ember/object';
import {inject as service} from '@ember/service';
import Component from '@ember/component';
import LayoutRules from '../mixins/layout-rules';
import StyleSafe from '../mixins/style-safe';

var MdIcon = Component.extend(LayoutRules, StyleSafe, {
  iconService: service('icon'),

  tagName: 'md-icon',

  attributeBindings: ['md-menu-origin', 'md-menu-align-target'],

  didInsertElement() {
    this._super(...arguments);
    this.setupIcon();
  },

  iconName: computed('md-svg-icon', 'md-svg-src', function () {
    return this.get('md-svg-icon') || this.get('md-svg-src') || '';
  }),

  classNameBindings: ['iconClass'],

  fontIcon: computed('mdFontIcon', function () {
    return 'md-font ' + this.get('mdFontIcon');
  }),

  loadIcon: observer('iconName', function () {

    var iconName = this.get('iconName'),
      element = this.$();


    if (iconName) {
      var is = this.get('iconService');
      is.getIcon(iconName)
        .then(function (icon) {
          element.html(icon.svg);
          ;
        });
    } else {
      element.empty();
    }
  }),

  setupIcon() {
    if (!this.get('mdFontIcon')) {
      this.loadIcon();
    }
  }

});

export default MdIcon;
