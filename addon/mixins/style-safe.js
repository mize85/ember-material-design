import Ember from "ember";

const StyleSafeMixin = Ember.Mixin.create({
  attributeBindings: ['styleSafe:style'],

  styleSafe: Ember.computed('style', function () {
    const style = this.get('style') || '';
    return new Ember.String.htmlSafe(style);
  })

});

export default StyleSafeMixin;
