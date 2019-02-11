import Mixin from '@ember/object/mixin';
import {get} from '@ember/object';

let HasFlexMixin = Mixin.create({
  init() {
    this._super();

    const {
      tagName,
    } = this;

    if (tagName && tagName.length) {

      let newAttributeBindings = ['flex'];
      const bindings = get(this, 'attributeBindings');
      if (bindings) {
        newAttributeBindings = newAttributeBindings.concat(bindings);
      }
      this.set('attributeBindings', newAttributeBindings);
    }
  },
  flex: null
});

export default HasFlexMixin;
