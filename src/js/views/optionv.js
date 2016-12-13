define(function(require) {
    'use strict';
    var Backbone = require('lib/backbone'),
        OptionView;
    OptionView = Backbone.View.extend({
        tagName:'option',
        initialize: function() {
            this.listenTo(this.model,'change',this.render);
        },
        render: function() {
            this.el.value = this.model.get('fid');
            this.el.text = this.model.get('name');
            return this;
        }
    });
    return OptionView;
});