define(function(require) {
    'use strict';
    var Backbone = require('lib/backbone'),
        $ = require('lib/jquery'),
        cache = require('util/cache'),
        conditionCollection = require('collections/conditions'),
        optionCollection = require('collections/options'),
        FilterGroupView = require('views/filtergroupv'),
        FilterView = require('views/filterv'),
        ExplainView = require('views/explainv'),
        TableView = require('views/tablev'),
        SearchView = require('views/searchv'),
        EditView;
    EditView = Backbone.View.extend({
        el: '.JeditContainer',
        events: {
            'click .JaddReport': 'createReport'
        },
        initialize: function() {
            this.render();
        },
        render:function(){
            new FilterGroupView();
            new FilterView();
            new ExplainView();
            new TableView();
            new SearchView();
        },
        createReport: function() {
            var optionList;
            optionList = optionCollection.getSelectedList();
            conditionCollection.add({
                explain: cache.explain,
                table: cache.table,
                filters: optionList,
                rows: cache.rows,
                cols: cache.cols
            });
        },
        clearView: function() {
            this.$el.html('this is page 404');
        }
    });
    return EditView;
});