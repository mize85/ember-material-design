import {htmlSafe} from '@ember/string';
import {computed} from '@ember/object';
import Mixin from '@ember/object/mixin';

const StyleSafeMixin = Mixin.create({
  attributeBindings: ['styleSafe:style'],

  styleSafe: computed('style', function () {
    const style = this.get('style') || '';
    return new htmlSafe(style);
  })

});

export default StyleSafeMixin;
