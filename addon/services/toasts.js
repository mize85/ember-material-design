import {computed, observer} from '@ember/object';
import {later} from '@ember/runloop';
import {A} from '@ember/array';
import Service from '@ember/service';
import Toast from '../models/toast';

var ToastService = Service.extend({

  toasts: A([]),

  showToast: function (toast) {

    // check to see if there are existing toast and destroy them
    var existingToasts = this.get('toasts').filterBy('open');

    existingToasts.forEach((t) => {
      t.set('destroying', true);
    });

    toast.opening = true;
    var newToast = Toast.create(toast);

    var delay = existingToasts.length > 0 ? 400 : 0;

    later(this, () => {
      this.get('toasts').pushObject(newToast);
      return newToast;
    }, delay);


  },

  activeToasts: computed('toasts.@each.open', function () {
    return A(this.get('toasts').filterBy('open', true));
  }),

  removeToast: function (toast) {
    toast.set('destroying', true);
  },

  destroyToasts: observer('toasts.@each.destroyed', function () {
    var destroyedToasts = this.get('toasts').filterBy('destroyed');
    destroyedToasts.forEach((dt) => {
      this.get('toasts').removeObject(dt);
    });
  })

});

export default ToastService;
