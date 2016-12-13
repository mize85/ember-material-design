import Ember from 'ember';

var HasFlexMixin = Ember.Mixin.create({
  init() {
    this._super(...arguments);

    const {
      tagName,
    } = this;

    if(tagName && tagName.length){
      let newAttributeBindings = [];
      const bindings = get(this, 'attributeBindings');

      newAttributeBindings.concat(['flex']);
      newAttributeBindings.concat(bindings);

      this.set('attributeBindings', newAttributeBindings);
    }
  },
  flex: null
});

export default HasFlexMixin;
