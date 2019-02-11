import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

var SidenavController = Controller.extend({

  mediaQueries: service('media-queries'),



  init: function() {
    this.get('mediaQueries').match('gt-md', '(min-width: 960px)');
    //this.set('sidebarLocked', this.get('mediaQueries.isGtSm'));
  },

  sidebarLeftVisible: false,
  sidebarRightVisible: false,

  sidebarLeftLocked: computed('mediaQueries.isGtMd', function() {
    return this.get('mediaQueries.isGtMd');
  }),

  actions: {
    toggleSidebarLeft: function() {
      this.toggleProperty('sidebarLeftVisible');
    },

    toggleSidebarRight: function() {
      this.toggleProperty('sidebarRightVisible');
    }
  }

});

export default SidenavController;
