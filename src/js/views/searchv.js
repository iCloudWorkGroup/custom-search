define(function(require) {
    'use strict';
    var SearchView,
        tree = require('lib/tree'),
        Backbone = require('lib/backbone'),
        CONFIG = require('util/config'),
        send = require('util/send'),
        $ =  require('lib/jquery');

    SearchView = Backbone.View.extend({
        el: '.JsearchContainer',
        events: {
            'click button': 'displayResult'
        },
        initialize: function() {
            this.$input = $('input', this.$el);
        },
        displayResult: function() {
            var key = this.$input.val().trim();
            if (key !== '') {
                send({
                    url: CONFIG.searchUrl + key,
                    type: 'get',
                    success:renderSuccess,
                    error:function(data){
                        console.log('back data error');
                    }
                });
            }
            function renderSuccess(backdata) {
                Backbone.trigger('bindTree', {
                    container: '#searchTree',
                    baseNode: backdata
                });
            }
        }
    });
    return SearchView;
});