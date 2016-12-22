define(function(require) {
    'use strict';
    var Backbone = require('lib/backbone'),
        $ = require('lib/jquery'),
        CONFIG = require('util/config'),
        cache = require('util/cache'),
        send = require('util/send'),
        FilterIntegrateView;
    FilterIntegrateView = Backbone.View.extend({
        className: 'panel panel-default extend-panel-body',
        initialize: function(cfg) {
            if (cfg.status === 'preview') {
                this.$el.on('click', this.model, this.previewTable.bind(this));
            }
            if (cfg.status === 'edit') {
                this.$el.on('click', this.model, this.reduceTable);
            }
            this.template = _.template($('#template-filtergroup').html());
        },
        render: function() {
            var splitObject = this.model.toJSON();
            splitObject.configName = CONFIG.select;
            this.$el.html(this.template(splitObject));
            return this;
        },
        controlDisplay:function(){
            $('.JfilterGroupPreview .panel').removeClass('panel-primary');
            this.$el.addClass('panel-primary');
        },
        reduceTable: function(e) {

        },
        previewTable: function(e) {
            this.controlDisplay();
            send({
                url: CONFIG.previewURL,
                success: function(data) {
                    Backbone.trigger('fillPreviewTable', data);
                },
                error: function() {
                    console.log('async request preview table failed');
                }
            });
        }
    });
    return FilterIntegrateView;
});