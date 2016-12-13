import Ember from 'ember';
const {get} = Ember;

let HasFlexMixin = Ember.Mixin.create({
  init() {
    this._super(...arguments);

    const {
      tagName,
    } = this;

    if(tagName && tagName.length){
      let newAttributeBindings = [];
      const bindings = get(this, 'attributeBindings');

      newAttributeBindings = newAttributeBindings.concat(['flex']);
      newAttributeBindings = newAttributeBindings.concat(bindings);

      this.set('attributeBindings', newAttributeBindings);
    }
  },
  flex: null
});

export default HasFlexMixin;
