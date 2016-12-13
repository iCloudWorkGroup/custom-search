define(function(require) {
    'use strict';
    var Backbone = require('lib/backbone'),
        cache = require('util/cache'),
        TabTemplate = require('views/tabtemplatev'),
        FilterView = require('views/filterv'),
        ExplainView = require('views/explainv'),
        TableView = require('views/tablev'),
        SearchView = require('views/searchv'),
        config = require('util/config'),
        $ = require('lib/jquery'),
        Router;
    Router = Backbone.Router.extend({
        routes: {
            '*filter': 'setStatus'
        },
        setStatus: function(status, id) {
            var tabTemplate = new TabTemplate();
            if (status === 'preview' && id !== 0 || status === 'edit') {
                cache.status = status;
                tabTemplate.render();
                new FilterView(config);
                new ExplainView();
                new TableView();
                new SearchView();
            } else {
                tabTemplate.clearView();
                return;
            }
        }
    });
    new Router();
    Backbone.history.start();
    // var y = {
    //     filters:[{name:'1212'}]
    // }
    // var x = _.template($('#template-filtergroup').html());
    // document.body.innerHTML = x(y);
});