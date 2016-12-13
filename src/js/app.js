requirejs.config({
    baseUrl: './js'
});
define(function(require) {
    'use strict';
    var $ = require('lib/jquery')
    $(function() {
        require('route/router');
    });
});