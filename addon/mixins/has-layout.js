import Ember from 'ember';

const {get} = Ember;

let HasLayoutMixin = Ember.Mixin.create({


  init() {
    this._super();

    const {
      tagName,
    } = this;

    if(tagName && tagName.length){
      const bindings = get(this, 'attributeBindings');
      let newAttributeBindings = [].concat(bindings, ['layoutType:layout', 'layout-align']);
      this.set('attributeBindings', newAttributeBindings);
    }
  },
  layoutType: null

});

export default HasLayoutMixin;
