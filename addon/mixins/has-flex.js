import Ember from 'ember';
const {get} = Ember;

let HasFlexMixin = Ember.Mixin.create({
  init() {
    this._super();

    const {
      tagName,
    } = this;

    if(tagName && tagName.length){

      let newAttributeBindings = ['flex'];
      const bindings = get(this, 'attributeBindings');
      if(bindings){
        newAttributeBindings= newAttributeBindings.concat(bindings);
      }
      this.set('attributeBindings', newAttributeBindings);
    }
  },
  flex: null
});

export default HasFlexMixin;
