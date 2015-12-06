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



var LayoutRulesMixin = Ember.Mixin.create({
  
  finalRules: Ember.computed(function(){
    var ret = [];
    var self = this;

    this.get('layoutProperties').forEach(function(layoutProperty){
        self.get('sizeNames').forEach(function(sizeName){
            ret.push(layoutProperty + '-' + sizeName);
        });
    
        ret.push('hide');
        ret.push('show');
    });
    
    ret.push.apply(ret, self.get("layoutSingleRules"));
    
    return ret;
  }),

  attributeBindings: finalRules

});

export default LayoutRulesMixin;
