import {isPresent} from '@ember/utils';
import {htmlSafe} from '@ember/string';
import {computed, observer} from '@ember/object';
import $ from 'jquery';
import {schedule, throttle} from '@ember/runloop';
import {A} from '@ember/array';
import ArrayProxy from '@ember/array/proxy';
import {inject as service} from '@ember/service';
import Evented, {on} from '@ember/object/evented';
import Component from '@ember/component';
import RippleMixin from '../mixins/ripples';
import LayoutRules from '../mixins/layout-rules';
import {assign} from '@ember/polyfills';

var MdTabs = Component.extend(Evented, LayoutRules, RippleMixin, {
  tagName: 'md-tabs',

  mediaQueries: service('media-queries'),

  setupMediaQuery: on('didInsertElement', function () {
    this.get('mediaQueries').match('sm', '(max-width: 600px)');
  }),

  constants: service('constants'),

  attributeBindings: ['md-border-bottom', 'md-align-tabs'],
  classNameBindings: ['dynamicHeight:md-dynamic-height'],

  tabs: [],

  elements: null,
  lastSelectedIndex: null,
  focusIndex: 0,
  offsetLeft: 0,
  hasContent: true,
  hasFocus: false,
  lastClick: false,
  borderBottom: false,
  dynamicHeight: false,
  centerTabs: false,
  noPagination: false,
  selectedIndex: 0,


  init() {
    this._super(...arguments);
    this.setupTabs();
  },

  didInsertElement() {
    this._super(...arguments);
    this.setupComponent();
    this.setupWindowResize();
    this.getElements();
  },

  willDestroyElement() {
    this._super(...arguments);
    this.removeWindowResize();
  },

  setupTabs() {
    this.set('tabs', ArrayProxy.create({
      content: A([])
    }));
  },

  tabElements: {},


  setupComponent() {
    this.set('tabs.content', this.get('tabs').sortBy('index'));
    schedule('afterRender', () => {
      this.calculatePagination();
      this.select(this.get('selectedIndex'));
      this.set('offsetLeft', this.get('offsetLeft'));
      this.updateInkBarStyles();
      this.updateHeightFromContent();
    });
  },

  setupWindowResize() {
    $(window).on('resize', () => {
      schedule('sync', () => {
        this.handleWindowResize();
      });
    });
  },

  removeWindowResize() {
    $(window).off('resize');
  },

  handleWindowResize: on('resize', function () {
    // recalculate pagination
    throttle(this, this.calculatePagination, 16);


    this.set('lastSelectedIndex', this.get('selectedIndex'));
    this.updateInkBarStyles();
    this.updateHeightFromContent();
  }),

  getElementsObserver: observer('tabs.[]', function () {
    this.getElements();
  }),

  getElements() {
    if (!this.$()) {
      return;
    }
    // TODO: make these components and have them auto register?
    var elements = {};
    elements.wrapper = this.$()[0].getElementsByTagName('md-tabs-wrapper')[0];
    elements.canvas = elements.wrapper.getElementsByTagName('md-tabs-canvas')[0];
    elements.paging = elements.canvas.getElementsByTagName('md-pagination-wrapper')[0];
    elements.tabs = elements.paging.getElementsByTagName('md-tab-item');
    elements.dummies = elements.canvas.getElementsByTagName('md-dummy-tab');
    elements.inkBar = elements.paging.getElementsByTagName('md-ink-bar')[0];

    // gather tab content items
    elements.contentsWrapper = this.$()[0].getElementsByTagName('md-tabs-content-wrapper')[0];
    elements.contents = elements.contentsWrapper.getElementsByTagName('md-tab-content');

    this.elements = elements;
  },

  incrementSelectedIndex(inc, focus) {
    var newIndex,
      index = focus ? this.get('focusIndex') : this.get('selectedIndex');
    for (newIndex = index + inc;
         this.get('tabs').objectAt(newIndex) && this.get('tabs').objectAt(newIndex).get('disabled');
         newIndex += inc) {
    }
    if (this.get('tabs').objectAt(newIndex)) {
      if (focus) {
        this.set('focusIndex', newIndex);
      } else {
        this.set('selectedIndex', newIndex);
      }
    }
  },

  handleFocusIndexChange: observer('focusIndex', function () {
    var newIndex = this.get('focusIndex');
    if (!this.elements.tabs[newIndex]) {
      return;
    }

    this.adjustOffset();
    this.redirectFocus();

  }),

  redirectFocus: on('focusIn', function () {
    if (!this.elements || !this.elements.dummies || !this.get('focusIndex')) {
      return;
    }

    this.elements.dummies[this.get('focusIndex')].focus();
  }),

  adjustOffset() {
    if (!this.elements.tabs[this.get('focusIndex')]) {
      return;
    }
    if (this.get('shouldCenterTabs')) {
      return;
    }

    var tab = this.elements.tabs[this.get('focusIndex')],
      left = tab.offsetLeft,
      right = tab.offsetWidth + left;

    this.beginPropertyChanges();
    var offsetLeft = this.get('offsetLeft');
    this.set('offsetLeft', Math.max(offsetLeft, this.fixOffset(right - this.elements.canvas.clientWidth)));
    this.set('offsetLeft', Math.min(offsetLeft, this.fixOffset(left)));
    this.endPropertyChanges();
  },

  offsetLeftStyle: computed('offsetLeft', function () {
    var offsetLeft = this.get('offsetLeft');
    var newValue = this.get('shouldCenterTabs') ? '' : '-' + offsetLeft + 'px';
    newValue = `transform: translate3d(${newValue}, 0, 0)`;

    return htmlSafe(newValue);
  }),

  attachRipple(element) {

    if (!this.elements) {
      return;
    }

    var options = {
      colorElement: $(this.elements.inkBar)
    };

    this.get('rippleService').attachTabBehavior(element, options);
  },

  shouldStretchTabs: computed('mediaQueries.isSm', 'shouldPaginate', function () {
    switch (this.get('md-stretch-tabs')) {
      case 'always':
        return true;
      case 'never':
        return false;
      default:
        return !this.get('shouldPaginate') && this.get('mediaQueries.isSm');
    }
  }),

  shouldCenterTabs: computed('shouldPaginate', 'centerTabs', function () {
    return this.get('centerTabs') && !this.get('shouldPaginate');
  }),

  calculatePagination: observer('tabs.[]', function () {
    if (!this.elements || !this.elements.tabs || this.elements.tabs.length <= 1) {
      return false;
    }
    var canvasWidth = this.$().prop('clientWidth');

    if (this.elements.tabs) {

      for (var i = 0; i < this.elements.tabs.length; i++) {
        var tab = this.elements.tabs[i];

        if (tab.nodeName === "MD-TAB-ITEM") {
          canvasWidth -= tab.offsetWidth;
        }
      }
    }

    var shouldPaginate = canvasWidth < 0;

    var noPagination = this.get('noPagination');
    if (noPagination) {
      shouldPaginate = false;
    }

    this.set('shouldPaginate', shouldPaginate);

  }),

  shouldPaginate: false,

  insertTab(tabData, index) {
    var self = this;
    var proto = {
        getIndex() {
          return self.get('tabs').indexOf(tab);
        },
        isActive() {
          return this.getIndex() === self.get('selectedIndex');
        },
        isLeft() {
          return this.getIndex() < self.get('selectedIndex');
        },
        isRight() {
          return this.getIndex() > self.get('selectedIndex');
        },
        hasFocus() {
          return !self.get('lastClick') && self.get('hasFocus') && this.getIndex() === self.get('focusIndex');
        }
      },
      tab = assign(proto, tabData);

    if (typeof tabData.tabContent !== 'string') {
      self.set('hasContent', false);
    }

    if (isPresent(index)) {
      var position;
      if (index > this.get('tabs.length')) {
        position = 0;
      } else {
        position = index;
      }

      this.get('tabs').insertAt(position, tab);
    } else {
      this.get('tabs').addObject(tab);
    }

    schedule('afterRender', () => {
      if (!this.elements) {
      } else {
        this.updateInkBarStyles();
      }
    });

    return tab;
  },

  removeTab(tabData) {
    this.get('tabs').removeAt(tabData.getIndex());
    this.refreshIndex();

    // wait for the item to be removed from the DOM
    schedule('afterRender', this, this.updateInkBarStyles);
  },

  select(index) {
    this.beginPropertyChanges();
    this.set('focusIndex', index);
    this.set('selectedIndex', index);
    this.set('lastClick', true);
    this.endPropertyChanges();
  },

  scroll(event) {
    if (!this.get('shouldPaginate')) {
      return;
    }

    event.preventDefault();

    this.set('offsetLeft', this.fixOffset(this.get('offsetLeft') - event.wheelDelta));
  },

  fixOffset(value) {
    var lastTab = this.elements.tabs[this.elements.tabs.length - 1],
      totalWidth = lastTab.offsetLeft + lastTab.offsetWidth;

    value = Math.max(0, value);
    value = Math.min(totalWidth - this.elements.canvas.clientWidth, value);
    return value;
  },


  canPageBack: computed('offsetLeft', function () {
    return this.get('offsetLeft') > 0;
  }),

  canPageForward: computed('offsetLeft', function () {

    if (!this.elements.tabs) {
      return false;
    }

    var lastTab = this.elements.tabs[this.elements.tabs.length - 1];
    return lastTab && lastTab.offsetLeft + lastTab.offsetWidth > this.elements.canvas.clientWidth + this.get('offsetLeft');
  }),

  refreshIndex() {
    this.set('selectedIndex', this.getNearestSafeIndex(this.get('selectedIndex')));
    this.set('focusIndex', this.getNearestSafeIndex(this.get('focusIndex')));
  },

  handleSelectedIndexChange: observer('selectedIndex', function () {
    this.set('selectedIndex', this.getNearestSafeIndex(this.get('selectedIndex')));
    this.updateHeightFromContent();
    this.updateInkBarStyles();
    this.set('lastSelectedIndex', this.get('selectedIndex'));
  }),

  updateHeightFromContent() {
    if (!this.get('dynamicHeight')) {
      return this.$().css('height', '');
    }

    var tabContent = this.elements.contents[this.get('selectedIndex')],
      contentHeight = tabContent.offsetHeight,
      tabsHeight = this.elements.wrapper.offsetHeight,
      newHeight = contentHeight + tabsHeight;

    this.$().css('height', newHeight + 'px');
  },

  updateInkBarStyles: function () {
    if (!this.elements || !this.elements.tabs || this.elements.tabs.length <= 0) {
      return;
    }

    var index = this.get('selectedIndex'),
      totalWidth = this.elements.paging.offsetWidth,
      tab = this.elements.tabs[index],
      left = tab.offsetLeft,
      right = totalWidth - left - tab.offsetWidth;

    this.updateInkBarClassName();
    $(this.elements.inkBar).css({left: left + 'px', right: right + 'px'});
  },

  updateInkBarClassName() {
    var newIndex = this.get('selectedIndex'),
      oldIndex = this.get('lastSelectedIndex'),
      ink = $(this.elements.inkBar);

    ink.removeClass('md-left md-right');
    if (typeof oldIndex !== 'number') {
      return;
    }

    if (newIndex < oldIndex) {
      ink.addClass('md-left');
    } else if (newIndex > oldIndex) {
      ink.addClass('md-right');
    }
  },

  getNearestSafeIndex(newIndex) {
    var maxOffset = Math.max(this.get('tabs.length') - newIndex, newIndex),
      i, tab;

    for (i = 0; i <= maxOffset; i++) {
      tab = this.get('tabs').objectAt(newIndex + i);
      if (tab && (tab.disabled !== true)) {
        return tab.getIndex();
      }

      tab = this.get('tabs').objectAt(newIndex - 1);
      if (tab && (tab.disabled !== true)) {
        return tab.getIndex();
      }
    }
    return newIndex;
  },

  actions: {
    nextPage() {
      var viewportWidth = this.elements.canvas.clientWidth,
        totalWidth = viewportWidth + this.get('offsetLeft'),
        i, tab;

      for (i = 0; i < this.elements.tabs.length; i++) {
        tab = this.elements.tabs[i];
        if (tab.offsetLeft + tab.offsetWidth > totalWidth) {
          break;
        }
      }
      this.set('offsetLeft', this.fixOffset(tab.offsetLeft));
    },

    previousPage() {
      var i, tab;
      for (i = 0; i < this.elements.tabs.length; i++) {
        tab = this.elements.tabs[i];
        if (tab.offsetLeft + tab.offsetWidth >= this.get('offsetLeft')) {
          break;
        }
      }
      this.set('offsetLeft', this.fixOffset(tab.offsetLeft + tab.offsetWidth - this.elements.canvas.clientWidth));
    }
  }

});

export default MdTabs;
