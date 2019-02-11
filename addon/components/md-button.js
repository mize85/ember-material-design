import {computed} from '@ember/object';
import Component from '@ember/component';
import RipplesMixin from '../mixins/ripples';
import LayoutRules from '../mixins/layout-rules';

var MdButtonComponent = Component.extend(LayoutRules, RipplesMixin, {

  tagName: 'button',

  classNames: ['md-button'],

  attributeBindings: ['disabled', 'href', 'type', 'target', 'action'],

  didInsertElement() {
    this._super(...arguments);

    const rs = this.get('rippleService');
    if (rs) rs.setupButton(this, this.$());

    //if (this.get('action')) {
    //  this.$().attr('md-has-action', true);
    //}
  },

  buttonClassNames: computed('classNames', function () {

    var classNames = '';

    this.get('classNames').forEach((cn) => {
      classNames = classNames + " " + (cn);
    });

    return classNames;

  }),

  click() {
    this.sendAction('action', this.get('param'));
  }

});

export default MdButtonComponent;
