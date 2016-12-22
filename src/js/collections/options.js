define(function(require) {
    'use strict';
    var Backbone = require('lib/backbone'),
        OptionModel = require('models/option'),
        Options;

    Options = Backbone.Collection.extend({
        model: OptionModel,
        url: '',
        getSelectedList: function() {
            var list = this.where({
                selected: true
            });
            return list;
        },
        //除了指定level的结果
        getSelectedExcludByLevel: function(paramLevel) {
            return this.filter(function(item) {
                return item.get('level') !== paramLevel;
            });
        },
        //大于指定level的结果
        getSelectedListGreaterByLevel: function(step) {
            return this.filter(function(item) {
                return item.get('level') > step;
            });
        },
        getSelectedByLevel: function(step) {
            return this.findWhere({
                level: step,
                selected: true
            });
        }
    });
    return new Options();
});