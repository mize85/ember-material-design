import { later } from '@ember/runloop';
import Controller from '@ember/controller';

export default Controller.extend({
    mode: 'query',
    determinateValue: 30,

    setupTimer: function() {
        later(this, function() {
            this.incrementProperty('determinateValue', 1);
            if (this.get('determinateValue') > 100) {
                this.set('determinateValue', 30);
            }

            later(this, this.setupTimer);

        }, 100);
    }
});
