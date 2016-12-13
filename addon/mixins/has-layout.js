import Ember from 'ember';

const {get} = Ember;

let HasLayoutMixin = Ember.Mixin.create({


  init() {
    this._super();

    const {
      tagName,
    } = this;

    if(tagName && tagName.length){
      let newAttributeBindings = ['layoutType:layout', 'layout-align'];
      const bindings = get(this, 'attributeBindings');
      if(bindings){
        newAttributeBindings= newAttributeBindings.concat(bindings);
      }
      this.set('attributeBindings', newAttributeBindings);
    }
  },
  layoutType: null

});

export default HasLayoutMixin;
