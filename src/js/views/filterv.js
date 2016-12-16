define(function(require) {
    'use strict';
    var Backbone = require('lib/backbone'),
        selectCollections = require('collections/selects'),
        optionCollections = require('collections/options'),
        SelectView = require('views/selectv'),
        tree = require('lib/tree'),
        CONFIG = require('util/config'),
        cache = require('util/cache'),
        $ = require('lib/jquery'),
        send = require('util/send'),
        FilterView;
    FilterView = Backbone.View.extend({
        el: '.JfiltersContainer',
        initialize: function() {
            this.listenTo(selectCollections, 'add', this.addOne);
            Backbone.on('bindTree', this.initTree, this);
            Backbone.on('unionFilters', this.unionFilters, this);
            this.render();
        },
        render: function() {
            this.initTree();
            this.initConstrutor(CONFIG.select);
        },
        addAll: function() {

        },
        addOne: function(item) {
            var selectview = new SelectView({
                model: item
            });
            this.$el.append(selectview.render().el);
        },
        initConstrutor: function(data) {
            var len = data.length,
                i = 0;
            for (; i < len; i++) {
                selectCollections.add(data[i]);
            };

        },
        initTree: function(cfg) {
            var currentConfig, setting;
            if (!cfg) {
                cfg = {};
            }
            currentConfig = {
                foldnUrl: cfg.foldnUrl || CONFIG.foldnUrl,
                oprUrl: cfg.oprUrl || CONFIG.oprUrl,
                container: cfg.container || '#dimensionTree',
                baseNode: cfg.baseNode || {
                    name: "指标树",
                    open: false,
                    isParent: true,
                    chkDisabled: true,
                    level:0
                }
            };
            setting = {
                async: {
                    enable: true,
                    url: currentConfig.foldnUrl,
                    contentType: 'application/json',
                    type: 'get',
                    autoParam: ["id"]
                },
                data: {
                    simpleData: {
                        enable: true
                    }
                },
                callback: {
                    onClick: this.unionFilters.bind(this)
                }
            };
            $.fn.zTree.init($(currentConfig.container), setting, currentConfig.baseNode);
        },
        unionFilters: function(e, treeId, treeNode) {
            if(treeNode.level === 0){
                return;
            }
            send({
                url: CONFIG.oprUrl,
                data: this.mosaicData(treeNode),
                success: function(data) {
                    Backbone.trigger('reFillOption', data.filters);
                    Backbone.trigger('fillExplain', data.explain);
                    Backbone.trigger('fillTable', data.table);
                    cache.explain = data.explain;
                    cache.table = data.table;
                }
            });
        },
        mosaicData: function(node) {
            var configData = optionCollections.getSelectedList();
            return JSON.stringify({
                filters: configData,
                currentLevel: node.level
            });
        }
    });
    return FilterView;
})