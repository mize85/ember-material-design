import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

var ApplicationController = Controller.extend({

    mediaQueries: service('media-queries'),

    init: function() {
        this.get('mediaQueries').match('gt-sm', '(min-width: 600px)');
        //this.set('sidebarLocked', this.get('mediaQueries.isGtSm'));
    },

    sidebarLocked: computed('mediaQueries.isGtSm', function() {
        return this.get('mediaQueries.isGtSm');
    }),

    actions: {
        toggleSidebar: function() {
            this.toggleProperty('sidebarVisible');
        }
    }

});

export default ApplicationController;
