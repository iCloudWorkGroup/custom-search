define(function(require) {
    'use strict';
    var PreviewView,
        Backbone = require('lib/backbone'),
        ToolbarPView = require('views/toolbar.pv'),
        FilterGroupPView = require('views/filtergroup.pv'),
        TablePView = require('views/table.pv'),
        Tablefunc = require('views/tablefunc.pv');
    PreviewView = Backbone.View.extend({
        el: '.JpreviewContainer',
        initialize: function() {
            this.render();
        },
        render: function() {
            new TablePView();
            new ToolbarPView();
            new FilterGroupPView();
            new Tablefunc();
        }
    });
    return PreviewView;
})