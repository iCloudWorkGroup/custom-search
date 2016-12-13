define(function(require) {
    'use strict';
    var Backbone = require('lib/Backbone'),
        $ = require('lib/jquery'),
        config = require('util/config'),
        FilterIntegrateView;
    FilterIntegrateView = Backbone.View.extend({
        className: 'panel panel-default extend-panel-body',
        initialize: function() {
            this.template = _.template($('#template-filtergroup').html());
        },
        render: function() {
            var splitObject = this.model.toJSON();
            splitObject.configName = config.select;
            this.$el.html(this.template(splitObject));
            return this;
        }
    });
    return FilterIntegrateView;
});