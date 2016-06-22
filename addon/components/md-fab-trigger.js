import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'md-fab-trigger',

  didInsertElement() {
    this._super(...arguments);
    this.setupComponent();
  },

  setupComponent() {

    let children = this.$().children();

    if(children){
      children.toArray().forEach((child) => {
        Ember.$(child).on('focus', () => {
          this.set('parentView.md-open', true);
        });

        Ember.$(child).on('blur', () => {
          this.set('parentView.md-open', false);
        });
      });
    }


  }

});
