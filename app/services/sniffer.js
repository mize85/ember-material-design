import {computed} from '@ember/object';
import Service from '@ember/service';

const isString = value => {
  return typeof value === 'string';
};

var lowercase = (string) => {
  return isString(string) ? string.toLowerCase() : string;
};

function toInt(str) {
  return parseInt(str, 10);
}


var SnifferService = Service.extend({
  vendorPrefix: '',
  transitions: false,
  animations: false,
  document: document,
  window: window,

  android: computed('', function () {
    return toInt((/android (\d+)/.exec(lowercase((this.get('window').navigator || {}).userAgent)) || [])[1]);
  }),

  init() {
    this._super(...arguments);

    var bodyStyle = this.get('document').body && this.get('document').body.style;
    var vendorPrefix;
    var vendorRegex = /^(Moz|webkit|ms)(?=[A-Z])/;

    var transitions = false;
    var animations = false;
    var match;

    if (bodyStyle) {
      for (var prop in bodyStyle) {
        if (match = vendorRegex.exec(prop)) {
          vendorPrefix = match[0];
          vendorPrefix = vendorPrefix.substr(0, 1).toUpperCase() + vendorPrefix.substr(1);
          break;
        }
      }

      if (!vendorPrefix) {
        vendorPrefix = ('WebkitOpacity' in bodyStyle) && 'webkit';
      }

      transitions = !!(('transition' in bodyStyle) || (vendorPrefix + 'Transition' in bodyStyle));
      animations = !!(('animation' in bodyStyle) || (vendorPrefix + 'Animation' in bodyStyle));

      if (this.get('android') && (!transitions || !animations)) {
        transitions = isString(bodyStyle.webkitTransition);
        animations = isString(bodyStyle.webkitAnimation);
      }


    }

    this.set('transitions', transitions);
    this.set('animations', animations);

    this.set('vendorPrefix', vendorPrefix);
  }

});

export default SnifferService;
