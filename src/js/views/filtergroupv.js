define(function(require) {
    'use strict';
    var Backbone = require('lib/Backbone'),
        conditionCollection = require('collections/conditions'),
        FilterIntegrate = require('views/filterintegratev'),
        MODE = require('util/mode'),
        CONFIG = require('util/config'),
        send = require('util/send'),
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

            if(MODE.init && MODE.fetch){
                MODE.fetch = MODE.init = false;
                this.fetchData(MODE.id).then(function(callData){
                    this.render(callData);
                }.bind(this));
            }
        },
        render: function(dataList) {
            var modelList = dataList.returndata,
                len = modelList.length,
                i = 0;
            for (; i < len; i++) {
                conditionCollection.add(modelList[i])
            }
            return this;
        },
        fetchData: function(csid) {
            var applyData = new Promise(function(resovle, reject) {
                send({
                    url: CONFIG.reduceUrl + csid,
                    type: 'get',
                    success: function(data) {
                        resovle(data);
                    }
                });
            });
            return applyData;
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