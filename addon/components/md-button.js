import Ember from 'ember';
import LayoutRules from '../mixins/layout-rules';

var MdButtonComponent = Ember.Component.extend(LayoutRules, {

    tagName: 'button',
    rippleService: Ember.inject.service('ripple')

    classNames: ['md-button'],

    attributeBindings: ['disabled', 'href', 'type', 'target', 'action'],

    didInsertElement() {
        this._super(...arguments);
        this.get('rippleService').setupButton(this, this.$());

        //if (this.get('action')) {
        //  this.$().attr('md-has-action', true);
        //}
    },

    buttonClassNames: Ember.computed('classNames', function() {

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
