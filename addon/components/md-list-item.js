import $ from 'jquery';
import Component from '@ember/component';
import LayoutRules from '../mixins/layout-rules';

var MdListItemComponent = Component.extend(LayoutRules, {
  tagName: 'md-list-item',
  classNameBindings: ['hasProxiedElement::md-no-proxy'],
  hasProxiedElement: false,

  didInsertElement() {
    this._super(...arguments);
    this.setupComponent();
  },

  setupComponent() {

    var proxiedTypes = ['md-checkbox', 'md-switch'],
      proxyElement;

    if (!this.action) {
      for (var i = 0, type; type = proxiedTypes[i]; ++i) {
        if (proxyElement = this.$()[0].querySelector(type)) {
          this.set('hasProxiedElement', true);
          break;
        }
      }

      if (this.get('hasProxiedElement')) {
        this.wrapIn('div');
      }
    } else {
      this.wrapIn('button');
    }

  },

  wrapIn: function (type) {
    var container;
    if (type === 'div') {
      container = $('<div class="md-no-style md-list-item-inner">');
      container.append(this.$().contents());
      this.$().addClass('md-proxy-focus');
    } else {
      container = $('<button tabindex="0" class="md-no-style"><div class="md-list-item-inner"></div></button>');

      // TODO: setup button click action
      container.children().eq(0).append(this.$().contents());
    }

    this.$()[0].setAttribute('tabindex', '-1');
    this.$().append(container);
  }
});

export default MdListItemComponent;
