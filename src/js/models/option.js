define(function(require) {
	'use strict';
	var Backbone = require('lib/backbone'),
		FilterModel;
	/**
	 * 查询信息
	 * @type {object}
	 */
	FilterModel = Backbone.Model.extend({
		defaults: {
			/**
			 * 条件级别
			 * @type {Number}
			 */
	        level: 2,
	        /**
	         * 条件id
	         * @type {String}
	         */
	        fid: '',
	        /**
	         * 条件名称
	         * @type {String}
	         */
	        name: '',
	        /**
	         * 是否选中
	         * @type {Boolean}
	         */
	        selected: false
		}
	});
	return FilterModel;
});

