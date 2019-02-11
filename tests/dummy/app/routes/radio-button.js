import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({

    icons: service('icon'),

    demoName: 'Radio Button',

    setupController: function(controller, setup) {
        this._super(controller, setup);

        var iconService = this.get('icons');

        iconService.iconSet('avatars', 'icons/avatar-icons.svg', 128);

        this.controllerFor('application').set('demoName', this.get('demoName'));
    }
});
