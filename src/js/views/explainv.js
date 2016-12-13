define(function(require) {
    'use strict';
    var Backbone = require('lib/backbone'),
        ExplainView;
    ExplainView = Backbone.View.extend({
        el: '.JexplainContainer',
        initialize: function() {
            Backbone.on('fillExplain', this.fillExplain, this);
        },
        fillExplain: function(data) {
            this.$el.html(data);
            return this;
        }
    });
    return ExplainView;
});