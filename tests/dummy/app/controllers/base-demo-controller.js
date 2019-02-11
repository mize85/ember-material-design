import { A } from '@ember/array';
import ArrayProxy from '@ember/array/proxy';
import { htmlSafe } from '@ember/string';
import { computed } from '@ember/object';
import Controller from '@ember/controller';

var BaseDemoController = Controller.extend({
    showSource: false,

    showSourceClass: computed('showSource', function() {
        var showSourceClass = this.get('showSource') ? 'show-source' : '';
        return htmlSafe(showSourceClass);
        //return showSourceClass.htmlSafe();
    }),

    demoName: '',

    sourceFiles: null,

    setSourceFiles: function(demoContent) {
        this._super();
        var demoName = this.get('demoName');

        var sourceFiles = ArrayProxy.create({
            content: A([
                {name: 'hbs', content: demoName + '-index.hbs'},
                {name: 'controller', content: demoName + '-controller.js'},
                {name: 'route', content: demoName + '-route.js'},
                {name: 'css', content: demoName + '-style.css'}
            ])
        });

        var sf = ArrayProxy.create({
            content: A(demoContent)
        });

        this.set('sourceFiles', sf);
    },

    actions: {
        showSource: function() {
            this.toggleProperty('showSource');
        }
    }
});

export default BaseDemoController;
