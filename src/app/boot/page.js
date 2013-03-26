/* Copyright (c) 2013, Marcel Duran - Released under the MIT License */

'use strict';

define(
  [
    'src/app/component_data/storage',
    'src/app/component_data/times',
    'src/app/component_ui/title',
    'src/app/component_ui/header',
    'src/app/component_ui/help',
    'src/app/component_ui/message',
    'src/app/component_ui/waiting',
    'src/app/component_ui/setup'
  ], function(
    StorageData,
    TimesData,
    TitleUI,
    HeaderUI,
    HelpUI,
    MessageUI,
    WaitingUI,
    SetupUI
  ) {

    function initialize() {
      StorageData.attachTo(document);
      TimesData.attachTo(document);
      TitleUI.attachTo('title');
      HeaderUI.attachTo('.bar-title');
      HelpUI.attachTo('#help');
      MessageUI.attachTo('#message');
      WaitingUI.attachTo('#waiting');
      SetupUI.attachTo('#setup');
    }

    return initialize;
  }
);
