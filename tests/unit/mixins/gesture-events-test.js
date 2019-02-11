import EmberObject from '@ember/object';
import GestureEventsMixin from 'ember-material-design/mixins/gesture-events';
import { module, test } from 'qunit';

module('GestureEventsMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var GestureEventsObject = EmberObject.extend(GestureEventsMixin);
  var subject = GestureEventsObject.create();
  assert.ok(subject);
});
