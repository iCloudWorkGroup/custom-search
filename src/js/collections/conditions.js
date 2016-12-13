define(function(require) {
    'use strict';
	var Backbone = require('lib/backbone'),
		ConditionModel = require('models/condition'),
		Conditions;
		
	Conditions = Backbone.Collection.extend({
		model: ConditionModel,
        url:''
	});
	return new Conditions();
});