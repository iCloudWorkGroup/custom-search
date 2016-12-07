AppView = Backbone.View.extend({
    el: '.app',
    events: {
        'click #btn-trigger': 'initConstrutor',
        'click #fill-trigger':''
    },
    initialize: function() {
        this.listenTo(selectCollections, 'add', this.addOne);
    },
    render: function() {

    },
    addAll: function() {

    },
    addOne: function(item) {
        var selectview = new SelectView({
            model: item
        });
        this.$el.append(selectview.render().el);
    },
    initConstrutor: function() {
        var len = SelectData.length,
            i = 0;
        for (; i < len; i++) {
            selectCollections.add(SelectData[i]);
        };

    }
});


new AppView();

var SelectData =[{
    name:'main',
    level:2
},
{
    name:'area',
    level:3
},
{
    name:'date',
    level:4
},
{
    name:'source',
    level:5
}]

var filterData = [{
    level: 2,
    "name": "filter name2",
    "id": "filter ID2",
    selected: true
},{
    level: 2,
    "name": "filter name2-2",
    "id": "filter ID2-2",
    selected: true
}, {
    level: 3,
    "name": "filter name3",
    "id": "filter ID3",
    selected: true
}, {
    "level": 4,
    "name": "filter name4",
    "id": "filter ID4",
    selected: true
}, {
    "level": 5,
    "name": "filter name 5",
    "id": "filter ID5",
    selected: true
}]