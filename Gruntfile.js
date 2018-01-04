/*jslint node: true */
module.exports = function (grunt) {
    'use strict';
    grunt.initConfig(
        {
            jslint: {
                meta: {
                    src: ['*.js']
                },
                js: {
                    src: 'js/*.js'
                }
            },
            csslint: {
                css: {
                    src: ['css/*.css']
                }
            },
            jsonlint: {
                manifests: {
                    src: ['*.json'],
                    options: {
                        format: true
                    }
                }
            },
            fixpack: {
                package: {
                    src: 'package.json'
                }
            },
            watch: {
                js: {
                    files: ['js/*.js'],
                    tasks: ['webpack']
                },
                css: {
                    files: ['css/*.css'],
                    tasks: ['webpack']
                }
            },
            shipit: {
                prod: {
                    deployTo: '/var/www/openvegemap/',
                    servers: 'pierre@dev.rudloff.pro',
                    postUpdateCmd: 'yarn install --prod'
                }
            },
            webpack: {
                build: require('./webpack.config.js')
            }
        }
    );

    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.loadNpmTasks('grunt-fixpack');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shipit');
    grunt.loadNpmTasks('shipit-git-update');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-webpack');

    grunt.registerTask('lint', ['jslint', 'fixpack', 'jsonlint', 'csslint']);
    grunt.registerTask('default', ['webpack']);
    grunt.registerTask('prod', ['shipit:prod', 'update']);
};
