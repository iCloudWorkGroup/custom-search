define(function(require) {
    'use strict';
    var Backbone = require('lib/backbone'),
        SelectModel;
    /**
     * 查询信息
     * @type {object}
     */
    SelectModel = Backbone.Model.extend({
        defaults: {
            name:'',
            level:2
        }
    });
    return SelectModel;
});