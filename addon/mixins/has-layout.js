import Ember from 'ember';

const {get} = Ember;

let HasLayoutMixin = Ember.Mixin.create({


  init() {
    this._super(...arguments);

    const {
      tagName,
    } = this;

    if(tagName && tagName.length){
      let newAttributeBindings = [];
      const bindings = get(this, 'attributeBindings');

      newAttributeBindings = newAttributeBindings.concat(['layoutType:layout', 'layout-align']);
      newAttributeBindings = newAttributeBindings.concat(bindings);

      this.set('attributeBindings', newAttributeBindings);
    }
  },
  layoutType: null

});

export default HasLayoutMixin;
