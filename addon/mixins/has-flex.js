import Ember from 'ember';
const {get} = Ember;

let HasFlexMixin = Ember.Mixin.create({
  init() {
    this._super(...arguments);

    const {
      tagName,
    } = this;

    if(tagName && tagName.length){
      const bindings = get(this, 'attributeBindings');
      const newAttributeBindings = [].concat(['flex'], bindings);
      this.set('attributeBindings', newAttributeBindings);
    }
  },
  flex: null
});

export default HasFlexMixin;
