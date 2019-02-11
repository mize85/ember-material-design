import { computed } from '@ember/object';
import Controller from '@ember/controller';

export default Controller.extend({
    data: {
        selectedIndex: 0,
        secondLocked: true,
        secondLabel: "Item Two",
        bottom: false
    },

    alignTabs: computed('data.bottom', function() {
        return this.get('data.bottom') ? 'bottom' : 'top';
    })
});
