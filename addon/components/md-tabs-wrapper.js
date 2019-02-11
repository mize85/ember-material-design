import {computed} from '@ember/object';
import {alias} from '@ember/object/computed';
import Component from '@ember/component';
import LayoutRules from '../mixins/layout-rules';

var MdTabWrapper = Component.extend(LayoutRules, {
  tagName: 'md-tabs-wrapper',
  classNameBindings: ['shouldStretchTabs:md-stretch-tabs'],

  tabsComponent: alias('parentView'),

  tabs: alias('tabsComponent.tabs'),

  shouldStretchTabs: computed('tabsComponent.shouldStretchTabs', function () {
    return this.get('tabsComponent.shouldStretchTabs');
  }),

  shouldPaginate: computed('tabsComponent.shouldPaginate', function () {
    return this.get('tabsComponent.shouldPaginate');
  }),

  //shouldCenterTabs: Ember.computed('tabsComponent.shouldCenterTabs', function() {
  //  return this.get('tabsComponent.shouldCenterTabs');
  //})
});

export default MdTabWrapper;
