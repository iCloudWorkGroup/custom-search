define(function(require) {
    'use strict';
    var Backbone = require('lib/backbone'),
        cache = require('util/cache'),
        AppView = require('views/appv'),
        MODE = require('util/mode'),
        Router;
    Router = Backbone.Router.extend({
        routes: {
            '*filter/:query': 'setStatus',
            '*filter': 'setStatus'
        },
        editRender: true, //是否渲染过编辑模式
        previewRender: true, //是否渲染过预览模式
        init: true,
        setStatus: function(status, csid) {
            //是编辑或者预览模式
            //是合法的id值
            //第一次进入页面时，存储查询的ID
            if (status === 'edit' || status === 'preview') {
                if (csid && typeof parseInt(csid) === 'number' && this.init) {
                    this.init = false;
                    MODE.fetch = true;
                    MODE.id = csid;
                }
                this.switchRender(status);
            }
        },
        switchRender: function(currentStatus) {
            if (this.editRender || this.previewRender && !this.appView) {
                this.appView = new AppView();
            }
            if (currentStatus === 'edit') {
                this.appView.oprView({
                    hideName: 'preview',
                    showName: 'edit'
                });
                if (this.editRender) {
                    this.editRender = false;
                    cache.status = currentStatus;
                    this.appView.render();
                    this.appView.initEditChildren();
                }
            }
            if (currentStatus === 'preview') {
                this.appView.oprView({
                    hideName: 'edit',
                    showName: 'preview'
                });
                if (this.previewRender) {
                    this.previewRender = false;
                    cache.status = currentStatus;
                    this.appView.render();
                    this.appView.initPreviewChildren();
                }
            }
        }
    });
    new Router();
    Backbone.history.start();
});