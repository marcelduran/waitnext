/* Copyright (c) 2013, Marcel Duran - Released under the MIT License */

'use strict';

define(['components/flight/lib/component'], function(defineComponent) {

  function title() {

    this.restart = function() {
      this.$node.text('Wait Next');
    };

    this.update = function(ev, data) {
      this.$node.text(data.estimate);
    };

    this.after('initialize', function() {
      this.on(document, 'restarted', this.restart);
      this.on(document, 'estimated', this.update);
    });

  }

  return defineComponent(title);

});
