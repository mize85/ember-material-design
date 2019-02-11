import { A } from '@ember/array';
import ArrayProxy from '@ember/array/proxy';
import { on } from '@ember/object/evented';
import { computed } from '@ember/object';
import BaseDemoController from '../controllers/base-demo-controller';

export default BaseDemoController.extend({
    init: function() {
        var content = [
            {name: 'hbs', content: 'input.hbs' },
            {name: 'controller', content: 'input-controller.js' }
        ];

        this.setSourceFiles(content);
    },

    showSourceIcons: false,

    showSourceClassIcons: computed('showSourceIcons', function() {
        return this.get('showSourceIcons') ? 'show-source' : '';
    }),

    sourceFilesIcons: null,

    setSourceFilesIcons: on('init', function() {
        var demoName = 'input-Icons';

        var sourceFiles = ArrayProxy.create({
            content: A([
                {name: 'hbs', content: demoName + '.hbs'},
                {name: 'controller', content: 'input-controller.js'}

            ])
        });

        this.set('sourceFilesIcons', sourceFiles);
    }),

    emailInvalid: computed('user2.email', function() {
      return !this.get('user2.email') || this.get('user2.email').length <= 0;
    }),

    postalCodeValidations: computed('user.postalCode', function() {
      var errors = [];

      if (!this.get('user.postalCode') || this.get('user.postalCode').length === 0) {
        errors.push('This is required');
      }

      return A(errors);

    }),

    hasPostalCodeErrors: computed('postalCodeValidations.length', function() {
      return this.get('postalCodeValidations.length') > 0;
    }),


    actions: {
        showSourceIcons: function() {
            this.toggleProperty('showSourceIcons');
        }
    },

    user: {
        title: 'Developer',
        email: 'ipsum@lorem.com',
        firstName: '',
        lastName: '' ,
        company: 'Google' ,
        address: '1600 Amphitheatre Pkwy' ,
        city: 'Mountain View' ,
        state: 'CA' ,
        biography: 'Loves kittens, snowboarding, and can type at 130 WPM.\n\nAnd rumor has it she bouldered up Castle Craig!',
        postalCode : '94043',
        submissionDate: null
    },

    user2: {
        name: 'John Doe',
        email: '',
        phone: '',
        address: 'Mountain View, CA'
    }
});
