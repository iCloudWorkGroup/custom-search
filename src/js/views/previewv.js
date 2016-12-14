define(function(require) {
    'use strict';
    var PreviewView,
        Backbone = require('lib/backbone'),
        ToolbarPView = require('views/toolbar.pv'),
        FilterGroupPView = require('views/filtergroup.pv'),
        TablePView = require('views/table.pv');
    PreviewView = Backbone.View.extend({
        el: '.JpreviewContainer',
        initialize: function() {
            this.render();
        },
        render: function() {
            new TablePView();
            new ToolbarPView();
            new FilterGroupPView();
        }
    });
    return PreviewView;
})