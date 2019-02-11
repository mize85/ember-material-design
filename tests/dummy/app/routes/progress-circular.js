import Route from '@ember/routing/route';

export default Route.extend({

	demoName: 'Progress Circular',

    setupController: function(controller, model) {
        this._super(controller, model);

        controller.setupTimer();

        this.controllerFor('application').set('demoName', this.get('demoName'));

    }
});
