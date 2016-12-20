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
        foldnUrl: 'https://private-f4749a-customsearch.apiary-mock.com/tree/getchild?1', //动态加载树节点
        oprUrl: 'https://private-f4749a-customsearch.apiary-mock.com/container/result', //获取所有信息，通过条件
        searchUrl: 'https://private-f4749a-customsearch.apiary-mock.com/tree/search?', //指标搜索
        transUrl: 'https://private-f4749a-customsearch.apiary-mock.com/container/trans/', //制作报表，下载传递数据
        transposeUrl: 'https://private-f4749a-customsearch.apiary-mock.com/table/transpose', //转置
        reduceUrl: 'https://private-f4749a-customsearch.apiary-mock.com/reduce/all/', //还原数据
        optionsUrl: 'https://private-f4749a-customsearch.apiary-mock.com/container/optionlist',//获取option集合m
        previewURL:'',
        container: ['edit', 'preview'],
        processbar:'.processbar'
    };
    return config;
})