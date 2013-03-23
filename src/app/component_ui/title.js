/* Copyright (c) 2013, Marcel Duran - Released under the MIT License */

'use strict';

define(['components/flight/lib/component'], function(defineComponent) {

  function title() {

    this.setTitle = screen.width <= 640 ? $.noop : function(text) {
      this.$node.text(text);
    };

    this.restart = function() {
      this.setTitle('Wait Next');
    };

    this.update = function(ev, data) {
      this.setTitle(data.estimate);
    };

    this.after('initialize', function() {
      this.on(document, 'restarted', this.restart);
      this.on(document, 'estimated', this.update);
    });

  }

  return defineComponent(title);

});
