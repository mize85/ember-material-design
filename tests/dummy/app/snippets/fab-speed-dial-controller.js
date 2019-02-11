import { A } from '@ember/array';
import BaseDemoController from '../controllers/base-demo-controller';

export default BaseDemoController.extend({

  demo: {
    topDirections: ['left', 'up'],
    bottomDirections: ['down', 'right'],

    isOpen: false,

    availableModes: A(['md-fling', 'md-scale']),
    selectedMode: 'md-fling',

    availableDirections: A(['up', 'down', 'left', 'right']),
    selectedDirection: 'up'
  }
});
