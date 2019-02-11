import { computed } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import BaseDemoController from '../controllers/base-demo-controller';

var ToastController = BaseDemoController.extend({
  demoName: 'toast',

  init: function() {
    var content = [
      {name: 'hbs', content: 'toast.hbs'},
      {name: 'controller', content: 'toast-controller.js'}
    ];

    this.setSourceFiles(content);
  },

  toastService: service('toasts'),

  toastPosition: A([
    {
      name: 'bottom',
      enabled: false
    }, {
      name: 'top',
      enabled: true
    }, {
      name: 'left',
      enabled: false
    }, {
      name: 'right',
      enabled: true
    }
  ]),

  toastNotifications: computed('toastService.toasts.[]', function() {
    return A(this.get('toastService.toasts'));
  }),

  toastPositionText: computed('toastPosition.@each.enabled', function() {
    var tp = this.get('toastPosition'),
      tpString = '';

    tp.forEach((position) => {
      if (position.enabled) {
        tpString = tpString + position.name + ' ';
      }
    });

    return tpString;
  }),

  actions: {
    showCustomToast: function() {
      this.get('toastService').showToast({
        position: this.get('toastPositionText'),
        action: 'Custom',
        content: 'Not implemented yet! :(',
        hideDelay: 5000
      });
    },

    showSimpleToast: function() {

      this.get('toastService').showToast({
        position: this.get('toastPositionText'),
        content: 'Simple Toast!'
      });
    },

    showActionToast: function() {
      this.get('toastService').showToast({
        position: this.get('toastPositionText'),
        action: 'OK',
        content: 'Action Toast!',
        resolve: 'actionAction'
      })
    },

    actionAction: function() {
      alert('You clicked \'OK\'.');
    }
  }
});

export default ToastController;
