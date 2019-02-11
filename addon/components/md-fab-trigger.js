import $ from 'jquery';
import Component from '@ember/component';

export default Component.extend({
  tagName: 'md-fab-trigger',

  didInsertElement() {
    this._super(...arguments);
    this.setupComponent();
  },

  setupComponent() {

    let children = this.$().children();

    if (children) {
      children.toArray().forEach((child) => {
        $(child).on('focus', () => {
          this.set('parentView.md-open', true);
        });

        $(child).on('blur', () => {
          this.set('parentView.md-open', false);
        });
      });
    }


  }

});
