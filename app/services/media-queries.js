import {run} from '@ember/runloop';
import {classify} from '@ember/string';
import {A} from '@ember/array';
import {computed} from '@ember/object';
import Service from '@ember/service';

var MediaQueriesService = Service.extend({

  matches: computed(function () {
    return A();
  }),

  /**
   * A hash of listeners
   */
  listeners: {},

  /**
   * The matcher to use for testing media queries
   */
  mql: window.matchMedia,

  match(name, query) {
    var matcher = (this.get('mql') || window.matchMedia)(query), isser = 'is' + classify(name);

    var listener = matcher => {
      this.set(name, matcher);
      this.set(isser, matcher.matches);

      if (matcher.matches) {
        this.get('matches').addObject(name);
      } else {
        this.get('matches').removeObject(name);
      }
    };

    this.get('listeners')[name] = listener;

    if (matcher.addListener) {
      matcher.addListener(matcher => {
        run(null, listener, matcher);
      });
    }

    listener(matcher);

  }


});

export default MediaQueriesService;
