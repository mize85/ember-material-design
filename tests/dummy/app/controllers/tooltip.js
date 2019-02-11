import BaseDemoController from '../controllers/base-demo-controller';

export default BaseDemoController.extend({
    init: function() {
        var content = [
            {name: 'hbs', content: 'tooltip.hbs' },
            {name: 'controller', content: 'tooltip-controller.js' }
        ];

        this.setSourceFiles(content);
    },

    demo: {}
});
