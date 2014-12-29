module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        // Clean
        clean: {
            development : ['development'],
            production  : ['production'],
            css         : ['css/*.css'],
            js          : [
                'js/vendor/**.js',
                'js/all.vendor.js',
                'js/all.js'
            ]
        },
        // End: Clean


        // Stylus
        stylus : {
            compile: {
                options: {
                    'paths'       : ['styl/**'],
                    'include css' : true,
                    'compress'    : false
                },
                files: {
                  'css/main.css' : 'styl/main.styl'
                }
            }
        },
        // End: Stylus


        // CSS Minification
        cssmin: {
            minify: {
                src  : 'css/main.css',
                dest : 'css/main.min.css'
            }
        },
        // End: CSS Minification


        // Copy
        copy: {
            vendor: {
                files: {
                    'js/vendor/zepto.js'     : 'bower_components/zepto/zepto.js',
                    'js/vendor/velocity.js'  : 'bower_components/velocity/velocity.js',
                    'js/vendor/fastclick.js' : 'bower_components/fastclick/lib/fastclick.js'
                }
            },
            development: {
                files: {
                    'development/index.html'       : 'index.html',
                    'development/favicon.ico'      : 'favicon.ico',
                    'development/favicon.png'      : 'favicon.png',
                    'development/css/main.min.css' : 'css/main.css',
                    'development/js/all.min.js'    : 'js/all.js',
                    'development/'                 : 'img/**'
                }
            },
            production: {
                files: {
                    'production/index.html'       : 'index.html',
                    'production/favicon.ico'      : 'favicon.ico',
                    'production/favicon.png'      : 'favicon.png',
                    'production/css/main.min.css' : 'css/main.min.css'
                    // For production, images copied by imgmin
                    // 'production/'              : 'img/**'
                }
            }
        },
        // End: Copy


        // Concat
        concat: {
            vendor: {
                files: {
                    'js/vendor.all.js' : [
                        'js/vendor/zepto.js',
                        'js/vendor/velocity.js',
                        'js/vendor/fastclick.js'
                    ]
                }
            },
            js: {
                files : {
                    'js/all.js' : [
                        'js/vendor.all.js',
                        'js/main.js'
                    ]
                }
            }
        },
        // End: Concat


        // Uglify
        uglify: {
            production: {
                files : {
                    'production/js/all.min.js' : ['js/all.js']
                }
            }
        },
        // End: Uglify


        // Imagemin
        imagemin: {
            production: {
                files: [{
                    expand : true,
                    cwd    : 'img/',
                    src    : ['**/*.{png,jpg}'],
                    dest   : 'production/img/'
                }]
            }
        },
        // End: Imagemin


        // Connect
        connect: {
            development: {
                options: {
                    base: 'development',
                    open: true
                }
            },
            production: {
                options: {
                    base: 'production',
                    open: true
                }
            }
        },
        // End: Connect


        // Watch
        watch: {
            options: {
                livereload: true
            },
            html: {
                files: '*.html',
                tasks: ['dev-refresh'],

            },
            styl: {
                files: 'styl/**',
                tasks: [
                    'stylus',
                    'copy:development'
                ]
            },
            js: {
                files: [
                    'js/main.js'
                ],
                tasks: ['dev-refresh']
            },
            livereload: {
                files: ['development/css/main.min.css']
            }
        },
        // End: Watch
    });

    // Load external tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // End: Load external tasks

    // Register tasks
    grunt.registerTask('default', [
        'clean:css',
        'clean:js',
        'clean:development',
        'copy:vendor',
        'concat',
        'stylus',
        'cssmin',
        'uglify',
        'copy:development',
        'copy:production'
    ]);

    grunt.registerTask('serve', [
        'default',
        'connect:development',
        'watch'
    ]);

    grunt.registerTask('dev-refresh', [
        'clean:development',
        'concat',
        'stylus',
        'copy:development'
    ]);

    grunt.registerTask('prepare', [
        'clean:css',
        'clean:js',
        'clean:production',
        'copy:vendor',
        'concat:vendor',
        'concat:js',
        'stylus',
        'cssmin',
        'uglify',
        'imagemin:production',
        'copy:production'
    ]);
    // End: Register tasks
}
