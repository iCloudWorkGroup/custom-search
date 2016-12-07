'use strict';
define(function(require) {
	var Backbone = require('lib/backbone'),
		ConditionModel;
	/**
	 * 查询信息
	 * @type {object}
	 */
	ConditionModel = Backbone.Model.extend({
		defaults: {
			/**
			 * 保存json数据
			 * @type {json}
			 */
			dataJSON: null
		}
	});
	return ConditionModel;
});