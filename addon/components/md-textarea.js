import {on} from '@ember/object/evented';
import {alias} from '@ember/object/computed';
import TextArea from '@ember/component/text-area';
import LayoutRules from '../mixins/layout-rules';

var MdTextArea = TextArea.extend(LayoutRules, {
  classNames: ['md-input'],

  inputContainer: alias('parentView'),
  value: alias('parentView.value'),

  resetContainer: on('willDestroyElement', function () {
    this.get('inputContainer').set('isFocused', false);
  }),

  setupTextArea: on('didInsertElement', function () {
    if (this.get('value')) {
      this.processInput();
    }


    this.changeTextArea();
  }),


  setFocused: on('focusIn', 'focusOut', function (ev) {
    var focused = ev.type === 'focusin';
    this.get('inputContainer').set('isFocused', focused);
  }),

  processInput: on('input', function () {
    var hasValue = this.get('value').length > 0;
    this.get('inputContainer').set('hasValue', hasValue);

  }),

  changeTextArea: on('keydown', 'input', function () {
    var node = this.$()[0];
    node.style.height = 'auto';
    node.scrollTop = 0;
    var height = this.getHeight(node);
    if (height) {
      node.style.height = height + 'px';
    }
  }),

  getHeight: function (node) {
    var line = node.scrollHeight - node.offsetHeight;
    return node.offsetHeight + (line > 0 ? line : 0);
  },

  scroll: function () {
    var node = this.$()[0];
    var line = node.scrollheight - node.offsetHeight;
    var height = node.offsetHeight + line;
    node.style.height = height + 'px';
  }
});

export default MdTextArea;
