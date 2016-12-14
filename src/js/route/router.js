define(function(require) {
    'use strict';
    var Backbone = require('lib/backbone'),
        cache = require('util/cache'),
        AppView = require('views/appv'),
        Router;
    Router = Backbone.Router.extend({
        routes: {
            '*filter/:query': 'setStatus',
            '*filter':'setStatus'
        },
        editRender: true,
        previewRender: true,
        setStatus: function(status, csid) {
            console.log(status);
            if (this.editRender || this.previewRender && !this.appView) {
                this.appView = new AppView();
            }
            if (status === 'edit') {
                this.appView.oprView({
                    hideName: 'preview',
                    showName: 'edit'
                });
                if (this.editRender) {
                    this.editRender = false;
                    cache.status = status;
                    this.appView.render();
                    this.appView.initEditChildren();
                }
            }
            if (status === 'preview') {
                this.appView.oprView({
                    hideName: 'edit',
                    showName: 'preview'
                });
                if (this.previewRender) {
                    this.previewRender = false;
                    cache.status = status;
                    this.appView.render();
                    this.appView.initPreviewChildren();
                }
            }
        }
    });
    new Router();
    Backbone.history.start();
});