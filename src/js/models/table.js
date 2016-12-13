define(function(require) {
	'use strict';
	var Backbone = require('lib/backbone'),
		DataModel;
	/**
	 * 查询信息
	 * @type {object}
	 */
	DataModel = Backbone.Model.extend({
		defaults: {
			/**
			 * table数据
			 * @type {object}
			 */
			content:''
		}
	});
	return DataModel;
});