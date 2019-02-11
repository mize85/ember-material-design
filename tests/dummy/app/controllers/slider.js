import { htmlSafe } from '@ember/string';
import { computed } from '@ember/object';
import BaseDemoController from '../controllers/base-demo-controller';

export default BaseDemoController.extend({
    init: function() {
        var content = [
            {name: 'hbs', content: 'slider.hbs' },
            {name: 'controller', content: 'slider-controller.js' }
        ];

        this.setSourceFiles(content);
    },

    color: {
        red: Math.floor(Math.random() * 255),
        green: Math.floor(Math.random() * 255),
        blue: Math.floor(Math.random() * 255)
    },

    colorStyle: computed('color.red', 'color.green', 'color.blue', function() {
        return htmlSafe("border: 1px solid #333; background: rgb(" + this.get('color.red') + "," + this.get('color.green') + "," + this.get('color.blue') + ")");
    }),

    rating1: 3,
    rating2: 2,
    rating3: 4,

    disabled1: 0,
    disabled2: 70
});
