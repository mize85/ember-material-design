import EmberObject from '@ember/object';
import LayoutMixin from 'ember-material-design/mixins/layout-rules';
import { module, test } from 'qunit';

module('LayoutRulesMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var LayoutObject = EmberObject.extend(LayoutMixin);
  var subject = LayoutObject.create();
  assert.ok(subject);
});
