define(function(require) {
    'use strict';
    var Backbone = require('lib/backbone'),
        optionCollections = require('collections/options'),
        $ = require('lib/jquery'),
        OptionView = require('views/optionv'),
        SelectView;
    SelectView = Backbone.View.extend({
        className: 'col-md-6 form-group',
        template: _.template($('#template-select').html()),
        events: {
            'change': 'rerender'
        },
        initialize: function() {
            this.listenTo(optionCollections, 'add', this.addOption);
            this.listenTo(optionCollections, 'reset', this.clearOption);
            Backbone.on('reFillOption', this.reFillOption, this);
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            this.$select = $('select', this.$el);
            return this;
        },
        rerender: function() {
            Backbone.trigger('unionFilters');
        },
        addOption: function(item) {
            if (this.model.get('level') !== item.get('level')) {
                return;
            }
            var optionview = new OptionView({
                model: item
            });

            this.$select.append(optionview.render().el);
        },
        reFillOption: function(data) {
            optionCollections.reset();
            this.fillOptions(data);
        },
        fillOptions: function(fillData) {
            var len = fillData.length,
                i = 0;
            for (; i < len; i++) {
                optionCollections.add(fillData[i]);
            };
        },
        clearOption: function() {
            this.$select.html('');
        }
    });
    return SelectView;
});