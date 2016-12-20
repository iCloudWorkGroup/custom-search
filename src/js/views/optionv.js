define(function(require) {
    'use strict';
    var Backbone = require('lib/backbone'),
        OptionView;
    OptionView = Backbone.View.extend({
        tagName: 'li',
        events: {
            'click': 'additionSelected'
        },
        initialize: function() {
            this.listenTo(this.model, 'destroy', this.remove);
        },
        render: function() {
            this.el.value = this.model.get ? this.model.get('fid') : this.model.fid;
            this.el.innerText = this.model.get ? this.model.get('name') : this.model.name;
            return this;
        },
        additionSelected: function() {
            var currentLevel = parseInt(this.$el.attr('value')),
                DOMOption = this.$el.text();
            Backbone.trigger('fillGlobalObj', {
                step: currentLevel,
                name: DOMOption.innerHTML,
                fid: DOMOption.value
            });
            Backbone.trigger('controlDisplay', {
                isHide: true
            });
        }
    });
    return OptionView;
});