import {inject as service} from '@ember/service';
import Mixin from '@ember/object/mixin';

var RipplesMixin = Mixin.create({
  rippleService: service('ripple')
});

export default RipplesMixin;
