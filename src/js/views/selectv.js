define(function(require) {
    'use strict';
    var Backbone = require('lib/backbone'),
        optionCollections = require('collections/options'),
        $ = require('lib/jquery'),
        OptionView = require('views/optionv'),
        CONFIG = require('util/config'),
        send = require('util/send'),
        SelectView;
    SelectView = Backbone.View.extend({
        className: 'col-md-6 form-group',
        template: _.template($('#template-select').html()),
        hasOptions: false,
        isHide: true,
        initialize: function() {
            this.listenTo(optionCollections, 'add', this.addOption);
            this.listenTo(optionCollections, 'reset', this.clearOption);
            Backbone.on('reFillOption', this.reFillOption, this);
            Backbone.on('controlDisplay', this.controlDisplay, this);
            this.$el.on('click', 'button', this.model, this.optionList.bind(this));
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            this.$optionContainer = $('.dropdown-menu', this.$el);
            this.$select = $('.dropdown', this.$el);
            this.$button = $('button label', this.$el).eq(0);
            return this;
        },
        controlDisplay: function(cfg) {
            if (cfg) {
                this.isHide = !cfg.isHide;
            }
            if (this.isHide) {
                this.isHide = false;
                this.$select.addClass('open');
            } else {
                this.isHide = true;
                this.$select.removeClass('open');
            }
        },
        optionList: function(e) {
            this.controlDisplay();
            if (!this.hasOptions) {
                var configData = optionCollections.getSelectedList(),
                    currentLevel = parseInt(e.data.get('level')),
                    sendData = JSON.stringify({
                        filters: configData,
                        step: currentLevel
                    });
                send({
                    url: CONFIG.optionsUrl,
                    data: sendData,
                    success: function(dataList) {
                        var len = dataList.list.length,
                            i = 0,
                            repeatOption = optionCollections.getSelectedByLevel(currentLevel);
                        for (; i < len; i++) {
                            if (repeatOption.get('fid') === dataList.list[i].fid) {
                                continue;
                            } else {
                                dataList.list[i].selected = false;
                                this.addOption(dataList.list[i]);
                            }
                        }
                        this.hasOptions = true;
                    }.bind(this),
                    error: function(data) {
                        console.log(data);
                    }
                });
            }
        },
        addOption: function(item) {
            var currentLevel;
            //确认添加的item对象是否backbone的item还是object对象
            if (item.get) {
                currentLevel = item.get('level');
            } else {
                currentLevel = item.level;
            }
            //排除level为1的属性节点
            if (currentLevel && this.model.get('level') !== currentLevel) {
                return;
            }
            var optionview = new OptionView({
                model: item
            });
            this.$optionContainer.append(optionview.render().el);
        },
        reFillOption: function(data) {
            // var i, len, list;
            // list = optionCollections.getSelectedListGreaterByLevel(cfg.step);
            // len = list.length;
            // for (; i < len; i++) {
            //     optionCollections.remove(list[i]);
            // }
            optionCollections.reset();
            this.fillOptions(data);
        },
        fillOptions: function(fillData) {
            var len = fillData.length,
                i = 0;
            for (; i < len; i++) {
                optionCollections.add(fillData[i]);
                if (!this.$button.attr('value') && this.$select.data('level') === fillData[i].level) {
                    this.$button.attr('value', fillData[i].id);
                    this.$button.text(fillData[i].name);
                }
            };
        },
        clearOption: function() {
            this.hasOptions = false;
            this.$optionContainer.html('');
        }
    });
    return SelectView;
});