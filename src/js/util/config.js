define(function(argument) {
    'use strict';
    var config = {
        select: [{
            name: '统计主体',
            level: 2
        }, {
            name: '数据来源',
            level: 3
        }, {
            name: '地区',
            level: 4
        }, {
            name: '时间',
            level: 5
        }],
        foldnUrl: 'https://private-f4749a-customsearch.apiary-mock.com/tree/getchild?1',
        oprUrl: 'https://private-f4749a-customsearch.apiary-mock.com/container/result',
        searchUrl: 'https://private-f4749a-customsearch.apiary-mock.com/tree/search?',
        transUrl:'https://private-f4749a-customsearch.apiary-mock.com/container/trans/',
        container:['edit','preview']
    };
    return config;
})