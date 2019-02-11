import EmberObject from '@ember/object';
import HasLayoutMixin from 'ember-material-design/mixins/has-layout';
import { module, test } from 'qunit';

module('HasLayoutMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var HasLayoutObject = EmberObject.extend(HasLayoutMixin);
  var subject = HasLayoutObject.create();
  assert.ok(subject);
});
