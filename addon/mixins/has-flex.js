import Ember from 'ember';
const {get} = Ember;

let HasFlexMixin = Ember.Mixin.create({
  init() {
    this._super();

    const {
      tagName,
    } = this;

    if(tagName && tagName.length){
      const bindings = get(this, 'attributeBindings');
      let newAttributeBindings = [].concat(['flex'], bindings);
      this.set('attributeBindings', newAttributeBindings);
    }
  },
  flex: null
});

export default HasFlexMixin;
