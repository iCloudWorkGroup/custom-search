'use strict';
define(function(require) {
	var Backbone = require('lib/backbone'),
		ExplainModel;
	/**
	 * 指标详解信息
	 * @type {object}
	 */
	ExplainModel = Backbone.Model.extend({
		defaults: {
			/**
			 * table数据
			 * @type {string}
			 */
			label :''
		}
	});
	return new ExplainModel();
});