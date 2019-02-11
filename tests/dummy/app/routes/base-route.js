import Route from '@ember/routing/route';

var BaseRoute = Route.extend({
	setupController: function(controller, model) {
		this._super(controller, model);

		this.controllerFor('application').set('demoName', this.get('demoName'));
	}

});

export default BaseRoute;