/* Copyright (c) 2013, Marcel Duran - Released under the MIT License */

'use strict';

define(['components/flight/lib/component'], function(defineComponent) {

  function help() {

    this.defaultAttrs({
      helpSelector: '.help'
    });

    this.toggleHelp = function(ev) {
      ev.preventDefault();
      this.$node.toggleClass('show');
    };

    this.after('initialize', function() {
      this.on(document, 'click', {
        helpSelector: this.toggleHelp
      });
    });

  }

  return defineComponent(help);

});
