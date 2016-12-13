define(function(require) {
    'use strict';
    var $ = require('lib/jquery'),
        packAjax;
    packAjax = function(cfg) {
        var self = this,
            config = {},
            NULLFUNC = function() {};
        if (!cfg.url) {
            return;
        }
        config = {
            url: typeof cfg.url === 'string' ? cfg.url : undefined,
            type: cfg.type || 'post',
            contentType: cfg.contentType || 'application/json; charset=UTF-8',
            dataType: cfg.dataType || 'json',
            data: cfg.data || '',
            async: cfg.async !== undefined ? cfg.async : false,
            timeout: cfg.timeout || 5000,
            success: cfg.success || NULLFUNC,
            error: cfg.error || NULLFUNC,
            complete: cfg.complete || NULLFUNC,
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
            success: config.success,
            error: config.error,
            complete: config.complete
        });
    }
    return packAjax;
});