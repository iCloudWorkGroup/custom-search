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
        getSelectedExcludByLevel: function(paramLevel) {
            return this.filter(function(item) {
                return item.get('level') !== paramLevel;
            });
        }
    });
    return new Options();
});