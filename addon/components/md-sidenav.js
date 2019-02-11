import {later} from '@ember/runloop';
import $ from 'jquery';
import {computed, observer} from '@ember/object';
import Component from '@ember/component';
import LayoutRules from '../mixins/layout-rules';

var MdSidenav = Component.extend(LayoutRules, {
  tagName: 'md-sidenav',

  classNames: ['md-closed'],
  classNameBindings: ['isLockedOpen:md-locked-open'],

  isLockedOpen: null,
  sidebarVisible: false,

  backdrop: computed(function () {
    return $('<md-backdrop class="md-sidenav-backdrop md-opaque">');
  }),

  toggleSidebar: observer('sidebarVisible', function () {
    var sidebarVisible = this.get('sidebarVisible');

    var backdrop = this.get('backdrop');

    var closeBackdrop = (ev) => {
      ev.preventDefault();
      ev.stopPropagation();

      this.set('sidebarVisible', false);
    };

    backdrop[sidebarVisible ? 'on' : 'off']('click', closeBackdrop);

    if (sidebarVisible) {
      this.$().removeClass('md-closed');
      this.$().parent().prepend(backdrop);
      backdrop.addClass('ng-enter');
      backdrop.removeClass('ng-leave');
    } else {
      this.$().addClass('md-closed');
      backdrop.removeClass('ng-enter');
      backdrop.addClass('ng-leave');

      later(() => {
        backdrop.remove();
      }, 0.2 * 1000);
      //backdrop.remove();
    }
  })


});

export default MdSidenav;
