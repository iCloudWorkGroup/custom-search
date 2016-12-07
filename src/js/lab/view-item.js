ItemView = Backbone.View.extend({
    tagName: 'option',
    initialize: function(argument) {
        this.listenTo(this.model,'change',this.render);
    },
    render: function() {
        this.el.value = this.model.get('id');
        this.el.text = this.model.get('name');
        return this;
    }
})