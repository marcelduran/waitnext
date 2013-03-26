/* Copyright (c) 2013, Marcel Duran - Released under the MIT License */

'use strict';

define(['components/flight/lib/component'], function(defineComponent) {

  function message() {

    this.defaultAttrs({
      closeSelector: '.close',
      titleSelector: '.title',
      textSelector: '.text',
      showClass: 'show'
    });

    this.close = function(ev) {
      ev.preventDefault();
      this.$node.removeClass(this.attr.showClass);
    };

    this.setMessage = function(ev, data) {
      this.select('titleSelector').text(data.title || 'Message');
      this.select('textSelector').text(data.text);
      this.$node.addClass(this.attr.showClass);
    };

    this.after('initialize', function() {
      this.on(document, 'message', this.setMessage);
      this.on('click', {
        closeSelector: this.close
      });
    });

  }

  return defineComponent(message);

});
