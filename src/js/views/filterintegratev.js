define(function(require) {
    'use strict';
    var Backbone = require('lib/backbone'),
        $ = require('lib/jquery'),
        CONFIG = require('util/config'),
        cache = require('util/cache'),
        FilterIntegrateView;
    FilterIntegrateView = Backbone.View.extend({
        className: 'panel panel-default extend-panel-body',
        initialize: function(cfg) {
            if (cfg.status === 'preview') {
                this.$el.on('click', this.model, this.previewTable);
            }
            this.template = _.template($('#template-filtergroup').html());
        },
        render: function() {
            var splitObject = this.model.toJSON();
            splitObject.configName = CONFIG.select;
            this.$el.html(this.template(splitObject));
            return this;
        },
        previewTable: function(e) {
            send({
                url: CONFIG.previewURL,
                success: function(data) {
                    Backbone.trigger('fillPreviewTable', data);
                    cache.condition = e.data;
                },
                error: function() {
                    console.log('async request preview table failed');
                }
            });
        }
    });
    return FilterIntegrateView;
});