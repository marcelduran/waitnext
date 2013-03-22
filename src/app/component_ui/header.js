/* Copyright (c) 2013, Marcel Duran - Released under the MIT License */

'use strict';

define(['components/flight/lib/component'], function(defineComponent) {

  function header() {

    this.defaultAttrs({
      restartSelector: '#restart',
      undoSelector: '#undo'
    });

    this.restart = function(ev) {
      ev.preventDefault();
      this.trigger(document, 'restart');
    };

    this.undo = function(ev) {
      ev.preventDefault();
      this.trigger(document, 'undo');
    };

    this.after('initialize', function() {
      this.on('click', {
        restartSelector: this.restart,
        undoSelector: this.undo
      });
    });

  }

  return defineComponent(header);

});
