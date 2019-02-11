import {on} from '@ember/object/evented';
import {alias} from '@ember/object/computed';
import TextField from '@ember/component/text-field';
import LayoutRules from '../mixins/layout-rules';
import StyleSafe from '../mixins/style-safe';

var MdInputComponent = TextField.extend(LayoutRules, StyleSafe, {

  classNames: ['md-input'],

  inputContainer: alias('parentView'),
  value: alias('parentView.value'),

  originalPlaceholder: '',

  willDestroyElement() {
    this._super(...arguments);
    this.resetContainer();
  },

  didInsertElement() {
    this._super(...arguments);
    this.setupPlaceholder();
  },

  setupPlaceholder() {

    this.set('originalPlaceholder', this.get('placeholder'));

    if (!this.get('inputContainer') || !this.get('placeholder')) {
      return;
    }

    if (typeof this.get('inputContainer.md-no-float') !== 'undefined') {

      return;
    }

    this.set('inputContainer.placeholder', this.get('placeholder'));
    //var placeholderText = this.get('placeholder');
    //
    //this.get('inputContainer').$().append('<div class="md-placeholder">' + this.get('placeholder') + '</div>');
    //
    //// we don't need this on the element anymore, so get rid of it
    this.set('placeholder', '');
    this.$().attr('placeholder', null);

    var inputContainerJquery = this.get('inputContainer').$();
    if (inputContainerJquery.find('label').length === 0) {
      var placeHolder = '<label>' + this.get('originalPlaceholder') + '</label>';
      this.set('inputContainer.mdIconFloat', true);
      inputContainerJquery.prepend(placeHolder);
    }

    this.processInput();

  },


  resetContainer() {
    this.get('inputContainer').set('isFocused', false);
  },

  setFocused: on('focusIn', 'focusOut', function (ev) {
    var focused = ev.type === 'focusin';
    this.get('inputContainer').set('isFocused', focused);
    if (ev.type === 'focusout') {
      this.get('inputContainer').set('isTouched', true);
    }
  }),

  processInput: on('input', function () {

    if (this.get('value') && this.get('value').length > 0) {
      this.get('inputContainer').set('value', this.get('value'));
      this.set('inputContainer.placeholder', '');

    } else {
      this.get('inputContainer').set('placeholder', this.get('originalPlaceholder'));
    }
  })

});

export default MdInputComponent;
