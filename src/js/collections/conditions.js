'use strict';
define(function(require) {
	var Backbone = require('lib/backbone'),
		conditionModel = require('models/condition'),
		Conditions;
		
	Conditions = Backbone.Collection.extend({
		model: conditionModel
	});
	return new Conditions();
});