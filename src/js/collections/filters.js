'use strict';
define(function(require) {
	var Backbone = require('lib/backbone'),
		FilterModel = require('models/filter'),
		Filters;
		
	Filters = Backbone.Collection.extend({
		model: FilterModel
	});
	return new Filters();
});