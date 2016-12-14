define(function(require) {
    'use strict';
    var Tablefunc,
        Backbone = require('lib/backbone'),
        CONFIG = require('util/config'),
        send = require('util/send'),
        cache = require('util/cache');
    Tablefunc = Backbone.View.extend({
        el: '.JtableFunc',
        events: {
            'click .Jtrans': 'transpose'
        },
        transpose: function() {
            send({
                url: CONFIG.transposeUrl,
                data: JSON.stringify(cache.condition.get('filters')),
                success: function(data) {
                    Backbone.trigger('fillPreviewTable', data);
                }
            });
        }
    });
    return Tablefunc;
});