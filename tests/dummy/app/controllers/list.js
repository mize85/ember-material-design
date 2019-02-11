import { computed } from '@ember/object';
import { A } from '@ember/array';
import BaseDemoController from '../controllers/base-demo-controller';

export default BaseDemoController.extend({

    init: function() {
        var content = [
            {name: 'hbs', content: 'list.hbs' },
            {name: 'controller', content: 'list-controller.js' }
        ];

        this.setSourceFiles(content);
    },

    todos: A([
        {
            face : 'http://lorempixel.com/50/50/people',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
        },
        {
            face : 'http://lorempixel.com/50/50/people',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
        },
        {
            face : 'http://lorempixel.com/50/50/people',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
        },
        {
            face : 'http://lorempixel.com/50/50/people',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
        },
        {
            face : 'http://lorempixel.com/50/50/people',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
        }
    ]),

    firstTodo: computed('', function() {
        return this.get('todos')[0];
    })
});
