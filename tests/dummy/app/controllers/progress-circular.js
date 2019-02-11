import { later } from '@ember/runloop';
import BaseDemoController from '../controllers/base-demo-controller';

export default BaseDemoController.extend({

    init: function() {
        var content = [
            {name: 'hbs', content: 'progress-circular.hbs' },
            {name: 'controller', content: 'progress-circular-controller.js' }
        ];

        this.setSourceFiles(content);
    },

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
