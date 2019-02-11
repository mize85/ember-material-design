import LinkComponent from '@ember/routing/link-component';
import Ember from 'ember';
import RipplesMixin from 'ember-material-design/mixins/ripples';

export function initialize(/* container, application */) {
  // application.inject('route', 'foo', 'service:foo');

  // by default we will insert the ripples mixin to links,
  // but ripples will only apply if the class is named 'md-button'
  // and the 'md-no-ink' attribute isn't set
  if (LinkComponent) {
    LinkComponent.reopen(RipplesMixin, {
      didInsertElement() {
        this._super();

        var rs = this.get('rippleService');

        var isMdButton = this.$().hasClass('md-button');
        if (!isMdButton || this.get('mdNoInk')) {
          return;
        }

        rs.attachButtonBehavior(this.$());
      }
    });
  } else {
    Ember.LinkView.reopen(RipplesMixin, {
      didInsertElement() {
        this._super();

        var isMdButton = this.get('classNames').contains('md-button');
        if (!isMdButton || this.get('mdNoInk')) {
          return;
        }

        var rs = this.get('rippleService');
        rs.attachButtonBehavior(this.$());
      }
    });
  }
}

export default {
  name: 'md-link-to',
  initialize: initialize
};
