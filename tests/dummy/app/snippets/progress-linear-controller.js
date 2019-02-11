import { later } from '@ember/runloop';
import Controller from '@ember/controller';

export default Controller.extend({
    mode: 'query',
    determinateValue: 30,
    determinateValue2: 30,

    setupTimer: function() {
        later(this, function() {
            this.incrementProperty('determinateValue', 1);
            this.incrementProperty('determinateValue2', 1.5);
            if (this.get('determinateValue') > 100) {
                this.set('determinateValue', 30);
                this.set('determinateValue2', 30);
            }

            later(this, this.setupTimer);

        }, 100);
    },

    setupTimer2: function() {
        later(this, function() {
            this.set('mode', this.get('mode') == 'query' ? 'determinate' : 'query');
            later(this, this.setupTimer2);
        }, 7200);
    }
});
