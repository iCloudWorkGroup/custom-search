SelectCollections = Backbone.Collection.extend({
    model:SelectModel,
    localStorage: new Backbone.LocalStorage('test')
});
selectCollections = new SelectCollections();