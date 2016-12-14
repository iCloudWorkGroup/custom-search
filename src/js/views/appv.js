define(function(require) {
    'use strict';
    var AppView,
        Backbone = require('lib/backbone'),
        EditView = require('views/editv'),
        PreviewView = require('views/previewv'),
        $ = require('lib/jquery'),
        cache = require('util/cache');
    AppView = Backbone.View.extend({
        el: '.JoprContainer',
        initialize: function() {
            this.$container = {
                edit: $('.JeditContainer'),
                preview: $('.JpreviewContainer')
            };
        },
        render: function() {
            this.$container[cache.status].html($('#template-' + cache.status + '-main').html());
            return this;
        },
        initEditChildren: function() {
            new EditView();
        },
        initPreviewChildren:function(){
            new PreviewView();
        },
        oprView: function(cfg) {
            this.$container[cfg.hideName].hide();
            this.$container[cfg.showName].show();
        }
    });
    return AppView;
})