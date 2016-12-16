define(function(require) {
    'use strict';
    var Backbone = require('lib/backbone'),
        conditionCollection = require('collections/conditions'),
        FilterIntegrate = require('views/filterintegratev'),
        $ = require('jquery'),
        FilterGroupView;
    FilterGroupView = Backbone.View.extend({
        el: '.JfilterGroup',
        events: {
            'click .patch-delete': 'patchDel'
        },
        initialize: function() {
            this.$listContainer = $('.panel-body', this.$el).eq(0);
            this.listenTo(conditionCollection, 'add', this.addReport);
            this.listenTo(conditionCollection, 'reset', this.patchDelReport);
        },
        addReport: function(item) {
            var filterintegrate = new FilterIntegrate({
                model: item,
                status: 'edit'
            });
            this.$listContainer.append(filterintegrate.render().el);
        },
        patchDel: function() {
            conditionCollection.reset();
        },
        patchDelReport: function() {
            this.$listContainer.html('');
        }
    });
    return FilterGroupView;
});