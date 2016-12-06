/**
 * @fileOverview 负责合并amd modules为一个单文件。
 */

'use strict';

var requirejs = require('requirejs'),
    fs = require('fs'),
    path = require('path');
// convert relative path to absolute path.
function convert(name, _path, contents) {
    var rDep = /\,\ ?\[.*\]\,function\(\ ?.*\ ?\)/ig,
        methodNotesReg = /\/\*(\s|.)*?\*\//ig;
    contents = contents.replace(rDep, ',function()');
    contents = contents.replace(methodNotesReg, '');
    return contents;
}

module.exports = function(grunt) {
    grunt.registerMultiTask('build', '合并amd modules为一个单文件', function() {

        var done = this.async(),
            options = this.options({
                banner: '',
                footer: '',
                process: null,
                builtin: {
                    dollar: false,
                    promise: false
                }
            }),
            pkg = grunt.config.get('pkg'),
            dest = this.data.dest,
            config, flag, custom;

        config = {

            baseUrl: 'src/js',
            name: '',
            out: '',

            // We have multiple minify steps
            optimize: 'none',

            // Include dependencies loaded with require
            findNestedDependencies: true,

            // Avoid breaking semicolons inserted by r.js
            skipSemiColonInsertion: true,

            wrap: {
                startFile: 'tools/build/intro.js',
                endFile: 'tools/build/outro.js'
            },

            rawText: {},

            onBuildWrite: function(name, _path) {
                var compiled = convert.apply(null, arguments);
                if (options.process) {
                    compiled = options.process(compiled, _path);
                }
                // 调整缩进
                compiled = compiled.replace(/(^|\r\n|\r|\n)/g, '$1    ');

                compiled = compiled.replace(/@version@/g, function() {
                    return pkg.version;
                });
                compiled = compiled.replace(/@rootPath@/g,function(){
                    return pkg.rootPath;
                })
                return compiled;
            },

            paths: [],
            include: []
        };

        options = grunt.util._.extend(options, this.data);
        config.name = 'spreadsheet';
        if (options.builtin.dollar) {
            config.rawText.dollar = 'define([\n' +
                '    \'./dollar-builtin\'\n' +
                '], function( $ ) {\n' +
                '    return $;\n' +
                '});';
        }

        if (options.builtin.promise) {
            config.rawText.promise = 'define([\n' +
                '    \'./promise-builtin\'\n' +
                '], function( $ ) {\n' +
                '    return $;\n' +
                '});';
        }

        if (this.data.preset === 'custom') {
            custom = [];

            this.files.forEach(function(file) {
                var files = file.src,
                    cwd = file.cwd || '';

                files.filter(function(filepath) {

                    filepath = path.join(cwd, filepath);
                    // Warn on and remove invalid source files (if nonull was set).
                    if (!grunt.file.exists(filepath)) {
                        grunt.log.warn('Source file "' + filepath + '" not found.');
                        return false;
                    } else {
                        return true;
                    }
                }).forEach(function(filepath) {
                    custom.push('\'' + filepath.replace(/\.\w+$/, '') + '\'');
                });
            });

            custom.unshift('\'./base\'');
            custom = 'define([\n    ' + custom.join(',\n    ') + '\n], function( Base ) {\n    return Base;\n});';
            config.rawText.spreadsheet = custom;
        } else if (this.data.preset) {

            config.rawText.spreadsheet = 'define([\n    ' + ['\'./preset/' +
                    this.data.preset + '\''
                ].join(',\n    ') +
                '\n], function( preset ) {\n    return preset;\n});';
        } else {
            config.name = this.data.name;
        }

        // 处理最终输出
        config.out = function(compiled) {
            var arr = [],
                banner = grunt.template.process(options.banner),
                footer = grunt.template.process(options.footer),
                sep = '\n\n';

            banner && arr.push(banner);

            if (options.builtin.dollar) {
                compiled = compiled.replace('define([ \'jquery\' ], exports );', 'define([], exports);');
            }

            arr.push(compiled);
            footer && arr.push(footer);

            // Write concatenated source to file
            grunt.file.write(dest, arr.join(sep));

            process.nextTick(function() {
                // requirejs有bug, callback不一定会执行，目前调试的结果是
                // prim的promise实现有问题。
                if (flag) return;
                grunt.log.ok("File '" + dest + "' created.");
                done();
                flag = true;
            });
        };

        if (options.fis) {
            config.wrap = {
                startFile: 'tools/build/fis/intro.js',
                endFile: 'tools/build/fis/outro.js'
            }
        }

        requirejs.optimize(config, function(response) {
            // requirejs有bug, callback不一定会执行，目前调试的结果是
            // prim的promise实现有问题。
            if (flag) return;
            grunt.verbose.writeln(response);
            grunt.log.ok("File '" + name + "' created.");
            done();
            flag = true;
        }, function(err) {
            done(err);
        });
    });
};