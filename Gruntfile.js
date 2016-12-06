module.exports = function(grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['Gruntfile.js', 'js/collections/*.js', 'js/models/*.js', 'js/basic/**/*.js'],
            options: {
                jshintrc: true,
                globals: {
                    jQuery: true
                },
                ignores: ['js/lib/*.js']
            }
        },
        build: {
            options: {
                banner: '/*! Spreadsheet <%= pkg.version %> */\n'
            },

            all: {
                name: 'spreadsheet/spreadsheet',
                dest: 'dist/fengniao.js',

                // 在没有jquery类似的库的前提下可以设置builtin,去除强行依赖。
                builtin: {
                    dollar: false,
                    promise: false
                }
            }
        },
    });
    require('load-grunt-tasks')(grunt);
    grunt.loadTasks('tools/build/tasks'); // 加载build目录下的所有task
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('check', ['jshint']);
    grunt.registerTask('dist', ['build']);
}