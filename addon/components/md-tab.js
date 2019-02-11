import {observer} from '@ember/object';
import {alias} from '@ember/object/computed';
import Component from '@ember/component';
import LayoutRules from '../mixins/layout-rules';

var MdTab = Component.extend(LayoutRules, {
  tagName: 'md-tab',

  attributeBindings: ['label', 'disabled', 'tab', 'active'],

  classNameBindings: ['isSelected:active'],

  tabs: alias('tabsComponent.tabs'),

  tabWrapperComponent: alias('parentView'),

  tabsComponent: alias('tabWrapperComponent.parentView'),

  data: {},

  didInsertElement() {
    this._super(...arguments);
    this.setupComponent();
  },

  willDestroyElement() {
    this._super(...arguments);
    this.removeTab();
  },

  setupComponent() {

    var tabs = this.$().parent()[0].getElementsByTagName('md-tab'),
      index = Array.prototype.indexOf.call(tabs, this.$()[0]),
      data = this.get('tabsComponent').insertTab({
        index: index,
        tabContent: this.getTemplate(),
        label: this.getLabel(),
        disabled: this.get('disabled')
      }, index);

    this.set('data', data);
  },

  removeTab() {
    this.get('tabsComponent').removeTab(this.get('data'));
  },

  setActive: observer('active', function () {
    if (this.get('active')) {
      this.get('tabsComponent').select(this.get('data').getIndex());
    }
  }),

  updateLabel: observer('label', function () {
    this.set('data.label', this.get('label'));
    this.get('tabsComponent').updateInkBarStyles();
  }),

  getLabel() {

    // if label provided, then send label
    if (this.get('label')) {
      return this.get('label');
    }

    // otherwise, we have to search for the md-tab-label element
    var label = this.$().find('md-tab-label');
    if (label) {
      return label.html();
    }

    // otherwise we have no label
    return 'Missing Label';
  },

  getTemplate() {
    var content = this.$().find('md-tab-template');
    return content.length ? content.html() : this.get('label') ? this.$().html() : null;
  },

  getDisabled: observer('disabled', function () {
    this.set('data.disabled', this.get('disabled'));
  })


});

export default MdTab;
