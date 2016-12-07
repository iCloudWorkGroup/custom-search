ItemCollections = Backbone.Collection.extend({
    model:ItemModel,
    localStorage: new Backbone.LocalStorage('test')
});
itemCollections = new ItemCollections();