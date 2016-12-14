define(function(require) {
    'use strict';
    var Backbone = require('lib/backbone'),
        FilterIntegrateView = require('views/filterintegratev'),
        conditionCollection = require('collections/conditions'),
        FilterIntegrate = require('views/filterintegratev'),
        FilterGroupPView;
    FilterGroupPView = Backbone.View.extend({
        el: '.JfilterGroupPreview',
        initialize: function() {
            this.listenTo(conditionCollection, 'add', this.addFilter);
            this.listenTo(conditionCollection, 'reset', this.patchDelReport);
            this.render();
        },
        render: function() {
            this.revertAll();
        },
        revertAll: function() {
            var i = 0,
                list = conditionCollection.models,
                len = list.length;
            for (; i < len; i++) {
                this.addFilter(list[i]);
            }
        },
        addFilter: function(item) {
            var filterintegrate = new FilterIntegrate({
                model: item,
                status:'preview'
            });
            this.$el.append(filterintegrate.render().el);
        },
        patchDelReport: function() {
            this.$el.html('');
        }
    });
    return FilterGroupPView;
})