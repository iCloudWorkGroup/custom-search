define(function(require) {
    'use strict';
    var Backbone = require('lib/backbone'),
        $ = require('lib/jquery'),
        config = require('util/config'),
        FilterIntegrateView;
    FilterIntegrateView = Backbone.View.extend({
        className: 'panel panel-default extend-panel-body',
        initialize: function(cfg) {
            if (cfg.status === 'preview') {
                this.$el.on('click', this.model.get('table'), this.previewTable);
            }
            this.template = _.template($('#template-filtergroup').html());
        },
        render: function() {
            var splitObject = this.model.toJSON();
            splitObject.configName = config.select;
            this.$el.html(this.template(splitObject));
            return this;
        },
        previewTable: function(e) {
            Backbone.trigger('fillPreviewTable', e.data);
        }
    });
    return FilterIntegrateView;
});