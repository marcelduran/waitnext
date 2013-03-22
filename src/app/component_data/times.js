/* Copyright (c) 2013, Marcel Duran - Released under the MIT License */

'use strict';

define(['components/flight/lib/component'], function(defineComponent) {

  function dataTimes() {
    var number, current, lastTime, times, timer, estimateTime, refresher,
        startTime;

    this.countdown = function() {
      var now, delta, h, m, s, estimate;

      now = Date.now();

      if (estimateTime >= now) {
        delta = parseInt((estimateTime - now) / 1000, 10);

        h = parseInt(delta / 60 / 60, 10);
        delta -= h * 60 * 60;
        m = parseInt(delta / 60, 10);
        delta -= m * 60;
        s = parseInt(delta, 10);

        h = h > 0 ? h + ':' : '';
        m = m > 0 ? (m < 10 && h ? '0' + m : m) + ':' : '';
        s = (s < 10 && m ? '0' : '') + s;

        estimate = h + m + s;
      } else {
        estimate = 'due';
      }

      this.trigger(document, 'estimated', {
        current: current,
        estimate: estimate,
        lastTime: lastTime,
        times: times
      });
    };

    this.estimate = function(sum) {
      var avg, togo, length;

      length = times.length + (sum !== undefined ? 1 : 0);
      sum = sum || 0;

      times.forEach(function eachTime(time) {
        sum += time.delta;
      });

      avg = sum / length;
      togo = avg * (number - current);
      estimateTime = new Date(lastTime + togo);

      clearInterval(timer);
      this.countdown.call(this);
      timer = setInterval(this.countdown.bind(this), 1000);
    };

    this.refresher = function() {
      this.estimate(Date.now() - lastTime);
    };

    this.start = function(ev, data) {
      number = data.number;
      current = data.current;
      startTime = lastTime = data.lastTime || Date.now();
      times = data.times || [];
      refresher = setInterval(this.refresher.bind(this), 10000);
    };

    this.restart = function() {
      clearInterval(timer);
      clearInterval(refresher);
    };

    this.next = function() {
      var now = Date.now();

      current += 1;

      times.push({
        time: now,
        delta: now - lastTime
      });

      lastTime = now;
      this.estimate();
    };

    this.undo = function() {
      if (times.length === 0) {
        return;
      }

      current -= 1;
      times.splice(times.length - 1, 1);
      if (times.length > 0) {
        lastTime = times[times.length - 1].time;
      } else {
        lastTime = startTime;
      }
      this.estimate();
    };

    this.restoreSession = function(ev, data) {
      this.start(ev, data);
      this.estimate();
    };

    this.after('initialize', function() {
      this.on(document, 'started', this.start);
      this.on(document, 'restarted', this.restart);
      this.on(document, 'next', this.next);
      this.on(document, 'undo', this.undo);
      this.on(document, 'restoreSession', this.restoreSession);
    });

  }

  return defineComponent(dataTimes);

});
