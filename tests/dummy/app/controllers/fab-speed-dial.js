import { A } from '@ember/array';
import BaseDemoController from '../controllers/base-demo-controller';

export default BaseDemoController.extend({

  init: function() {
    var content = [
      {name: 'hbs', content: 'fab-speed-dial.hbs'},
      {name: 'controller', content: 'fab-speed-dial-controller.js'}
    ];

    this.setSourceFiles(content);
  },

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
