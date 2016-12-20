define(function(require) {
    'use strict';
    var $ = require('lib/jquery'),
        CONFIG = require('util/config'),
        packAjax;
    packAjax = function(cfg) {
        var self = this,
            config = {},
            NULLFUNC = function() {},
            $processbar = $(CONFIG.processbar).eq(0);
        if (!cfg.url) {
            return;
        }
        config = {
            url: typeof cfg.url === 'string' ? cfg.url : undefined,
            type: cfg.type || 'post',
            contentType: cfg.contentType || 'application/json; charset=UTF-8',
            dataType: cfg.dataType || 'json',
            data: cfg.data || '',
            async: cfg.async !== undefined ? cfg.async : true,
            timeout: cfg.timeout || 5000,
            success: cfg.success || NULLFUNC,
            beforeSend:cfg.beforeSend || function(){
                $processbar.removeClass('over');
            },
            error: cfg.error || NULLFUNC,
            complete: cfg.complete || function(){
                $processbar.addClass('over');
            },
            isPublic: cfg.isPublic !== undefined ? cfg.isPublic : true
        };
        $.ajax({
            url: config.url,
            type: config.type,
            contentType: config.contentType,
            dataType: config.dataType,
            async: config.async,
            data: config.data,
            timeout: config.timeout,
            beforeSend:config.beforeSend,
            success: config.success,
            error: config.error,
            complete: config.complete
        });
    }
    return packAjax;
});