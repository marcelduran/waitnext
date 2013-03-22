/* Copyright (c) 2013, Marcel Duran - Released under the MIT License */

'use strict';

define(['components/flight/lib/component'], function(defineComponent) {

  function waiting() {

    this.defaultAttrs({
      nextSelector: '#next',
      estimateSelector: '#estimate',
      numberSelector: '.stats .your .number',
      currentSelector: '.stats .current .number'
    });

    this.toggle = function() {
      this.$node.toggle();
    };

    this.restart = function() {
      this.toggle();
    };

    this.start = function(ev, data) {
      this.toggle();
      this.select('numberSelector').text(data.number);
      this.select('currentSelector').text(data.current);
      this.select('estimateSelector').text('?');
    };

    this.next = function() {
      this.trigger(document, 'next');
    };

    this.update = function(ev, data) {
      this.select('estimateSelector').text(data.estimate);
      this.select('currentSelector').text(data.current);
    };

    this.after('initialize', function() {
      this.on(document, 'started', this.start);
      this.on(document, 'restarted', this.restart);
      this.on(document, 'estimated', this.update);
      this.on(document, 'restoreSession', this.start);
      this.on('click', {
        nextSelector: this.next
      });
    });

  }

  return defineComponent(waiting);

});
