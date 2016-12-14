define(function(require) {
    'use strict';
    var PreviewToolbarView,
        Backbone = require('lib/backbone'),
        optionCollection = require('collections/options'),
        cache = require('util/cache'),
        send = require('util/send'),
        CONFIG = require('util/config');
    PreviewToolbarView = Backbone.View.extend({
        el: '.JPtoolbar',
        events: {
            'click .favorite': 'favorite',
            'click .make': 'make',
            'click .download': 'download'
        },
        initialize: function() {

        },
        favorite: function() {

        },
        make: function() {
            this.sendAction('make');
        },
        download: function() {
            this.sendAction('download');
        },
        sendAction: function(action) {
            send({
                url: CONFIG.transUrl + action,
                data: this.mosaicData(),
                error: function(data) {
                    console.log('action error');
                }
            });
        },
        mosaicData: function() {
            var currentFilters = optionCollection.getSelectedList();
            return JSON.stringify({
                filters: currentFilters,
                rows: cache.rows,
                cols: cache.cols
            });
        }
    });
    return PreviewToolbarView;
});