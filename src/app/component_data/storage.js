/* Copyright (c) 2013, Marcel Duran - Released under the MIT License */

'use strict';

define(['components/flight/lib/component'], function(defineComponent) {

  function storage() {

    this.start = function(ev, data) {
      localStorage.setItem('state', 'waiting');
      localStorage.setItem('number', data.number);
      localStorage.setItem('current', data.current);
    };

    this.update = function(ev, data) {
      localStorage.setItem('current', data.current);
      localStorage.setItem('lastTime', data.lastTime);
      localStorage.setItem('times', JSON.stringify(data.times));
    };

    this.restart = function() {
      localStorage.clear();
    };

    this.checkSession = function() {
      if (localStorage.getItem('number')) {
        this.trigger(document, 'sessionExists', {
          number: parseInt(localStorage.getItem('number'), 10),
          current: parseInt(localStorage.getItem('current'), 10),
          lastTime: parseInt(localStorage.getItem('lastTime'), 10),
          times: JSON.parse(localStorage.getItem('times'))
        });
      }
    };

    this.after('initialize', function() {
      this.on(document, 'started', this.start);
      this.on(document, 'estimated', this.update);
      this.on(document, 'restarted', this.restart);
      this.on(document, 'checkSession', this.checkSession);
    });

  }

  return defineComponent(storage);

});

