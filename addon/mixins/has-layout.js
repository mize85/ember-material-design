import Mixin from '@ember/object/mixin';
import {get} from '@ember/object';

let HasLayoutMixin = Mixin.create({


  init() {
    this._super();

    const {
      tagName,
    } = this;

    if (tagName && tagName.length) {
      let newAttributeBindings = ['layoutType:layout', 'layout-align'];
      const bindings = get(this, 'attributeBindings');
      if (bindings) {
        newAttributeBindings = newAttributeBindings.concat(bindings);
      }
      this.set('attributeBindings', newAttributeBindings);
    }
  },
  layoutType: null

});

export default HasLayoutMixin;
