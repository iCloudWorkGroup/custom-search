define(function(require) {
    'use strict';
	var Backbone = require('lib/backbone'),
		SelectModel = require('models/select'),
		Selects;
		
	Selects = Backbone.Collection.extend({
		model: SelectModel,
        url:''
	});
	return new Selects();
});