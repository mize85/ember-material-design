import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
    iconService: service('icon'),

    demoName: 'Icon',

    setupController: function(controller, model) {
        this._super(controller, model);

        var is = this.get('iconService');

        this.controllerFor('application').set('demoName', this.get('demoName'));

        is.iconSet('social', 'images/icons/sets/social-icons.svg', 24);
        is.defaultIconSet('images/icons/sets/core-icons.svg', 24);

    }
});
