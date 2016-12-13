define(function(require) {
    'use strict';
    var Backbone = require('lib/backbone'),
        OptionModel = require('models/option'),
        Options;
        
    Options = Backbone.Collection.extend({
        model: OptionModel,
        url:'',
        getSelectedList:function(){
            var list = this.where({
                selected:true
            });
            return list;
        }
    });
    return new Options();
});