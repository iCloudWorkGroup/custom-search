SelectView = Backbone.View.extend({
    template: _.template($('#select-template').html()),
    events: {
        'click button': 'createData',
        'change select': 'reset'
    },
    initialize: function() {
        this.listenTo(itemCollections, 'add', this.addOne);
        this.listenTo(itemCollections, 'reset', this.s);
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    addOne: function(item) {
        if (this.model.get('level') != item.get("level")) {
            return;
        }
        var itemview = new ItemView({
            model: item
        });
        this.$select = $('select', this.$el);
        this.$select.append(itemview.render().el);
    },
    createData: function() {
        var len = filterData.length,
            i = 0;
        for (; i < len; i++) {
            itemCollections.add(filterData[i]);
        };
    },
    reset: function() {
        itemCollections.reset();
        this.createData();
    },
    s: function() {
        this.$select.html('');
    }
})