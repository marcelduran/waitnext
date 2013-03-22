/* Copyright (c) 2013, Marcel Duran - Released under the MIT License */

'use strict';

requirejs.config({baseUrl: '../../'});

require(['src/app/boot/page'], function(initialize) {
  initialize();
});
