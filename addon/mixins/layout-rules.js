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

var finalRules: function(){
    var ret = [];
    var self = this;

    layoutProperties.forEach(function(layoutProperty){
        sizeNames.forEach(function(sizeName){
            ret.push(layoutProperty + '-' + sizeName);
        });
    
        ret.push('hide');
        ret.push('show');
    });
    
    ret.push.apply(ret, layoutSingleRules);
    
    return ret;
  };


var LayoutRulesMixin = Ember.Mixin.create({

    attributeBindings: finalRules

});

export default LayoutRulesMixin;
