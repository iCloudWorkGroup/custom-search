module.exports = function(grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['src/js/**/*.js'],
            options: {
                jshintrc: true,
                globals: {
                    jQuery: true
                },
                ignores: ['src/js/lib/*.js']
            }
        },
        build: {
            options: {
                banner: '/*! customSearch <%= pkg.version %> */\n'
            },

            all: {
                name: 'app',
                dest: 'src/js/cs.min.js',

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