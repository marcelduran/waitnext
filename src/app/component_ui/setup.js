/* Copyright (c) 2013, Marcel Duran - Released under the MIT License */

'use strict';

define(['components/flight/lib/component'], function(defineComponent) {

  function setup() {

    this.defaultAttrs({
      startSelector: '#start',
      numberSelector: '#number',
      currentSelector: '#current',
      stateClass: 'state-setup'
    });

    this.toggle = function() {
      this.$node.toggle();
      $('body').toggleClass(this.attr.stateClass);
    };

    this.start = function(ev) {
      var number, current;

      ev.preventDefault();

      number = parseInt(this.select('numberSelector').val(), 10);
      current = parseInt(this.select('currentSelector').val(), 10);

      if (isNaN(number) || isNaN(current)) {
        return this.trigger(document, 'message', {
          text: 'Invalid number, use numbers only.'
        });
      }

      if (current >= number) {
        return this.trigger(document, 'message', {
          text: 'Current number cannot be larger or equal than your number'
        });
      }

      this.toggle();

      this.trigger(document, 'started', {
        number: number,
        current: current
      });
    };

    this.restart = function() {
      this.toggle();
      this.select('numberSelector').val('');
      this.select('currentSelector').val('');
      this.trigger(document, 'restarted');
    };

    this.restoreSession = function(ev, data) {
      this.toggle();
      this.trigger(document, 'restoreSession', data);
    };

    this.after('initialize', function() {
      this.on('submit', {startSelector: this.start});
      this.on(document, 'restart', this.restart);
      this.on(document, 'sessionExists', this.restoreSession);
      this.trigger(document, 'checkSession');
    });

  }

  return defineComponent(setup);

});
