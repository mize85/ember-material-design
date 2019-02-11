import { get, getWithDefault } from '@ember/object';
import { on } from '@ember/object/evented';
import Mixin from '@ember/object/mixin';
import ENV from '../config/environment';

export default Mixin.create({
    pageviewToGA: on('didTransition', function() {

        if (get(ENV, 'googleAnalytics.webPropertyId') != null) {
            var trackerType = getWithDefault(ENV, 'googleAnalytics.tracker', 'analytics.js');

            if (trackerType === 'analytics.js') {
                var globalVariable = getWithDefault(ENV, 'googleAnalytics.globalVariable', 'ga');

                window[globalVariable]('send', 'pageview', {
                    page: this.get('url'),
                    title: this.get('url')
                });
            } else if (trackerType === 'ga.js') {
                window._gaq.push(['_trackPageview']);
            }
        }
    })
});
