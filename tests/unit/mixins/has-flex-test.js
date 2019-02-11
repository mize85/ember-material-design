import EmberObject from '@ember/object';
import HasFlexMixin from 'ember-material-design/mixins/has-flex';
import { module, test } from 'qunit';

module('HasFlexMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var HasFlexObject = EmberObject.extend(HasFlexMixin);
  var subject = HasFlexObject.create();
  assert.ok(subject);
});
