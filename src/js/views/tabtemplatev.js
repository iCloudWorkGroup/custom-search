define(function(require) {
    'use strict';
    var Backbone = require('lib/backbone'),
        $ = require('lib/jquery'),
        cache = require('util/cache'),
        conditionCollection = require('collections/conditions'),
        optionCollection = require('collections/options'),
        FilterGroupView = require('views/filtergroupv'),
        tabTemplate;
    tabTemplate = Backbone.View.extend({
        el: '.JoprContainer',
        events: {
            'click .JaddReport': 'createReport'
        },
        initialize: function() {
            
        },
        render: function() {
            if (cache.status === 'preview' || 'edit') {
                this.$el.html($('#template-' + cache.status + '-main').html());
            }
            this.bindView();
        },
        bindView:function(){
            new FilterGroupView();
        },
        createReport: function() {
            var optionList;
            optionList = optionCollection.getSelectedList();
            conditionCollection.add({
                explain: cache.explain,
                table: cache.table,
                filters: optionList,
                rows:cache.rows,
                cols:cache.cols
            });
        },
        clearView: function() {
            this.$el.html('this is page 404');
        }
    });
    return tabTemplate;
});