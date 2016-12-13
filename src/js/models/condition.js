define(function(require) {
	'use strict';
	var Backbone = require('lib/backbone'),
		ConditionModel;
	/**
	 * 查询信息
	 * @type {object}
	 */
	ConditionModel = Backbone.Model.extend({
		defaults: {
			explain: '',
			table: '',
			filters: []
		}
	});
	return ConditionModel;
});