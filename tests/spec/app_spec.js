/* Copyright (c) 2013, Marcel Duran - Released under the MIT License */

define(
  [
    'src/app/component_data/storage',
    'src/app/component_data/times',
    'src/app/component_ui/header',
    'src/app/component_ui/help',
    'src/app/component_ui/message',
    'src/app/component_ui/waiting',
    'src/app/component_ui/setup'
  ], function(
    StorageData,
    TimesData,
    HeaderUI,
    HelpUI,
    MessageUI,
    WaitingUI,
    SetupUI
  ) {

  describe('App', function() {

    beforeEach(function() {
      localStorage.clear();
      loadFixtures('index.html');
      StorageData.attachTo(document);
      TimesData.attachTo(document);
      HeaderUI.attachTo('.bar-title');
      HelpUI.attachTo('#help');
      MessageUI.attachTo('#message');
      WaitingUI.attachTo('#waiting');
      SetupUI.attachTo('#setup');
    });

    afterEach(function() {
      StorageData.teardownAll();
      TimesData.teardownAll();
      HeaderUI.teardownAll();
      HelpUI.teardownAll();
      MessageUI.teardownAll();
      WaitingUI.teardownAll();
      SetupUI.teardownAll();
    });

    it('start with empty fields', function() {

        var startedEvent = spyOnEvent(document, 'started'),
            messageEvent = spyOnEvent(document, 'message');

        expect($('#setup')).toBeVisible();
        expect($('#waiting')).toBeHidden();

        $('#number').val('');
        $('#current').val('');
        $('#start').submit();

        expect(startedEvent).not.toHaveBeenTriggered();
        expect(messageEvent).toHaveBeenTriggered();
        expect($('#setup')).toBeVisible();
        expect($('#waiting')).toBeHidden();

        expect($('#message')).toBeVisible();
        $('#message .close').click();
        expect($('#message')).toBeHidden();

    });

    it('start with only one field', function() {

        var startedEvent = spyOnEvent(document, 'started'),
            messageEvent = spyOnEvent(document, 'message');

        expect($('#setup')).toBeVisible();
        expect($('#waiting')).toBeHidden();

        $('#number').val('100');
        $('#current').val('');
        $('#start').submit();

        expect(startedEvent).not.toHaveBeenTriggered();
        expect(messageEvent).toHaveBeenTriggered();
        expect($('#setup')).toBeVisible();
        expect($('#waiting')).toBeHidden();

        $('#number').val('');
        $('#current').val('100');
        $('#start').submit();
        expect(startedEvent).not.toHaveBeenTriggered();
        expect(messageEvent).toHaveBeenTriggered();
        expect($('#setup')).toBeVisible();
        expect($('#waiting')).toBeHidden();

        expect($('#message')).toBeVisible();
        $('#message .close').click();
        expect($('#message')).toBeHidden();

    });

    it('start with invalid range', function() {

        var startedEvent = spyOnEvent(document, 'started'),
            messageEvent = spyOnEvent(document, 'message');


        expect($('#setup')).toBeVisible();
        expect($('#waiting')).toBeHidden();

        $('#number').val('100');
        $('#current').val('200');
        $('#start').submit();

        expect(startedEvent).not.toHaveBeenTriggered();
        expect(messageEvent).toHaveBeenTriggered();
        expect($('#setup')).toBeVisible();
        expect($('#waiting')).toBeHidden();

        expect($('#message')).toBeVisible();
        $('#message .close').click();
        expect($('#message')).toBeHidden();

    });

    it('start with valid range', function() {

        var spyEvent = spyOnEvent(document, 'started');

        expect($('#setup')).toBeVisible();
        expect($('#waiting')).toBeHidden();

        $('#number').val('200');
        $('#current').val('100');
        $('#start').submit();

        expect(spyEvent).toHaveBeenTriggered();
        expect($('#setup')).toBeHidden();
        expect($('#waiting')).toBeVisible();

        expect($('.current .number').text()).toBe('100');
        expect($('.your .number').text()).toBe('200');
        expect($('#estimate').text()).toBe('?');
    });

    it('click next button', function() {

        $('#number').val('200');
        $('#current').val('100');
        $('#start').submit();
        $('#next').click();

        expect($('.current .number').text()).toBe('101');

        $('#next').click();

        expect($('.current .number').text()).toBe('102');
    });

    it('click undo button', function() {

        $('#number').val('200');
        $('#current').val('100');
        $('#start').submit();
        $('#next').click();

        expect($('.current .number').text()).toBe('101');

        $('#undo').click();

        expect($('.current .number').text()).toBe('100');

        $('#next').click();
        $('#next').click();
        $('#next').click();
        $('#undo').click();
        $('#undo').click();

        expect($('.current .number').text()).toBe('101');
    });

    it('restart app', function() {

        var spyEvent = spyOnEvent(document, 'restarted');
        $('#number').val('200');
        $('#current').val('100');
        $('#start').submit();
        $('#restart').click();

        expect(spyEvent).toHaveBeenTriggered();
        expect($('#setup')).toBeVisible();
        expect($('#waiting')).toBeHidden();

    });

    it('open and close help popover', function() {

        expect($('.popover')).toBeHidden();

        $('.bar-title .help').click();

        expect($('.popover')).toBeVisible();

        $('.popover-header .help').click();

        expect($('.popover')).toBeHidden();

    });

  });

});
