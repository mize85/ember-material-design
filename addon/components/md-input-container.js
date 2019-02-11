import {isEmpty, isNone} from '@ember/utils';
import {computed} from '@ember/object';
import Component from '@ember/component';
import LayoutRules from '../mixins/layout-rules';
import StyleSafe from '../mixins/style-safe';

var MdInputContainer = Component.extend(LayoutRules, StyleSafe, {
  tagName: 'md-input-container',

  attributeBindings: ['md-no-float'],

  classNameBindings: ['isFocused:md-input-focused',
    'hasValue:md-input-has-value',
    'displayInvalid:md-input-invalid',
    'mdIconFloat:md-icon-float'],

  isInvalid: false,
  displayInvalid: computed('isInvalid', 'isTouched', 'displayErrors', function () {
    if (!this.get('isTouched') && !(this.get('displayErrors'))) {
      return false;
    }

    if (this.get('isInvalid') || this.get('displayErrors')) {
      return true;
    }

    return false;

  }),
  isFocused: false,
  mdIconFloat: false,

  hasBeenTouched: false,

  isTouched: false,

  placeholder: '',

  hasValue: computed('value', function () {
    return !isNone(this.get('value')) && !isEmpty(this.get('value'));
  })


});

export default MdInputContainer;
