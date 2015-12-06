import Ember from 'ember';

const layoutProperties = [
    'layout',
    'layout-align',
    'flex-order',
    'flex',
    'offset',
    'hide',
    'show'

];

const layoutSingleRules = [
    'layout-type:layout',
    'layout-padding',
    'layout-margin',
    'layout-wrap',
    'layout-fill'
];

const sizeNames = [
    'sm',
    'gt-sm',
    'md',
    'gt-md',
    'lg',
    'gt-lg'

];



finalRules.push.apply(finalRules, layoutSingleRules);

var LayoutRulesMixin = Ember.Mixin.create({
  
  var finalRules = [];
  var self = this;
  
  this.get('layoutProperties').forEach(function(layoutProperty){
      self.get('sizeNames').forEach(function(sizeName){
          finalRules.push(layoutProperty + '-' + sizeName);
      });
  
      finalRules.push('hide');
      finalRules.push('show');
  });
  
  
  attributeBindings: finalRules

});

export default LayoutRulesMixin;
