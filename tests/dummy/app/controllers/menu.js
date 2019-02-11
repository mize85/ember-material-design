import { A } from '@ember/array';
import ArrayProxy from '@ember/array/proxy';
import { on } from '@ember/object/evented';
import BaseDemoController from '../controllers/base-demo-controller';

export default BaseDemoController.extend({

  init() {
    var content = [
      {name: 'hbs', content: 'menu.hbs'},
      {name: 'controller', content: 'menu-controller.js'}
    ];

    this.setSourceFiles(content);
  },

  showSourcePositionModes: false,

  setSourcePositionModes: on('init', function() {
    var sourceFiles = ArrayProxy.create({
      content: A([
        {name: 'hbs', content: 'menu-position-modes.hbs'},
        {name: 'controller', content: 'menu-controller.js'}
      ])
    });

    this.set('sourceFilesPositionModes', sourceFiles);
  }),


  isMenuOpen: false,
  isTargetModeMenuOpen: false,

  actions: {
    announceClick(number) {
      console.log('click ', number);
    },

    toggleMenu(menu) {
      menu.toggleProperty('isOpen');
    },

    showSourcePositionModes() {
      this.toggleProperty('showSourcePositionModes');
    }
  }
});
