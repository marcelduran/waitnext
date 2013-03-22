/* Copyright (c) 2013, Marcel Duran - Released under the MIT License */

'use strict';

var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point));
};

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    requirejs: {
      dist: {
        options: {
          baseUrl: './',
          name: 'src/app/boot/main',
          include: [
            'src/app/component_data/storage',
            'src/app/component_data/times',
            'src/app/component_ui/setup',
            'src/app/component_ui/header',
            'src/app/component_ui/title',
            'src/app/component_ui/waiting'
          ],
          out: 'tmp/<%= pkg.name %>.min.js'
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        },
        src: 'tmp/index.html',
        dest: 'dist/<%= pkg.version %>/index.html'
      }
    },

    jshint: {
      options: {
        browser: true,
        eqeqeq: true,
        curly: true,
        validthis: true,
        globalstrict: true,
        indent: 2,
        undef: true,
        unused: true,
        trailing: true,
        jquery: true,
        globals: {
          requirejs: true,
          require: true,
          define: true,
          module: true
        }
      },
      files: ['Gruntfile.js', 'src/app/**/*.js']
    },

    connect: {
      jasmine: {
        options: {
          port: 8001,
          base: './'
        }
      },
      livereload: {
        options: {
          port: 8000,
          hostname: '0.0.0.0',
          base: './build/',
          middleware: function(connect) {
            return [lrSnippet, folderMount(connect, './build/')];
          }
        }
      }
    },

    regarde: {
      all: {
        files: ['src/app/**/*.js', 'src/app/**/*.css', 'src/**/*'],
        tasks: ['build', 'livereload']
      }
    },

    jasmine: {
      src: 'app/',
      options: {
        host: 'http://localhost:<%= connect.jasmine.options.port %>/',
        specs: 'tests/spec/**/*_spec.js',
        helpers: 'tests/spec/**/*_helper.js',
        styles: [
          'components/ratchet/dist/ratchet.css',
          'src/app/css/styles.css'
        ],
        vendor: [
          'components/jquery/jquery.js',
          'components/jasmine-jquery/lib/jasmine-jquery.js',
          'components/requirejs/require.js'
        ],
        template: require('grunt-template-jasmine-requirejs'),
        templateOptions: {
          requireConfig: {
            baseUrl: './'
          }
        }
      }
    },

    uglify: {
      dist: {
        src: ['components/requirejs/require.js', 'src/inline/js/*.js'],
        dest: 'tmp/',
        expand: true,
        flatten: true,
        ext: '.min.js'
      }
    },

    concat: {
      dist: {
        options: {
          separator: ';'
        },
        src: [
          'components/jquery/jquery.min.js',
          'tmp/require.min.js',
          'tmp/<%= pkg.name %>.min.js'
        ],
        dest: 'dist/<%= pkg.version %>/js/<%= pkg.name %>.min.js'
      }
    },

    cssmin: {
      dist: {
        src: ['components/ratchet/dist/ratchet.css', 'src/app/css/styles.css'],
        dest: 'dist/<%= pkg.version %>/css/<%= pkg.name %>.min.css'
      }
    },

    copy: {
      build: {
        files: [
          {
            src: [
              'components/ratchet/dist/ratchet.css',
              'components/jquery/jquery.js',
              'components/requirejs/require.js',
              'components/flight/lib/*.js',
              'components/flight/tools/**/*.js',
              'images/*.png'
            ],
            dest: 'build/'
          },
          {
            src: [
              'src/app/**/*.css',
              'src/app/**/*.js'
            ],
            dest: 'build/'
          },
          {
            src: 'images/favicon.ico',
            dest: 'build/',
            expand: true,
            flatten: true
          }
        ]
      },
      dist: {
        files: [
          {
            src: [
              'images/*.png'
            ],
            dest: 'dist/<%= pkg.version %>/'
          },
          {
            src: [
              'images/favicon.ico'
            ],
            dest: 'dist/<%= pkg.version %>/',
            expand: true,
            flatten: true
          }
        ]
      }
    },

    clean: {
      dist: 'tmp/'
    },

    replace: {
      build: {
        options: {
          variables: {
            title: 'Wait Next',
            css: '<link rel="stylesheet" href="components/ratchet/dist/ratchet.css">\n' +
                 '<link rel="stylesheet" href="src/app/css/styles.css">',
            js: '<script src="components/jquery/jquery.js"></script>\n' +
                '<script data-main="src/app/boot/main" src="components/requirejs/require.js"></script>',
            ads: 'ads go here',
            ga: '',
            appcache: ''
          }
        },
        files: [
          {
            src: 'src/index.html',
            dest: 'build/index.html'
          }
        ]
      },
      dist: {
        options: {
          variables: {
            title: 'Wait Next',
            description: 'Get your estimated waiting time in line. Ideal for longest line services like DMV.',
            icon: 'http://waitnext/images/icon-256x256.png',
            url: 'http://waitnext.com',
            css: '<link rel="stylesheet" href="css/<%= pkg.name %>.min.css">',
            js: '<script src="js/<%= pkg.name %>.min.js"></script>',
            ads: '<script><%= grunt.file.read("tmp/adsense.min.js") %></script>' +
                 '<script src="http://pagead2.googlesyndication.com/pagead/show_ads.js"></script>',
            ga: '<script><%= grunt.file.read("tmp/ga.min.js") %></script>',
            appcache: 'manifest="manifest.appcache"',
            timestamp: '<%= grunt.template.today() %>',
            cache_css: 'css/<%= pkg.name %>.min.css',
            cache_js: 'js/<%= pkg.name %>.min.js'
          }
        },
        files: [
          {
            src: 'src/index.html',
            dest: 'tmp/index.html'
          },
          {
            src: 'src/manifest.appcache',
            dest: 'dist/<%= pkg.version %>/manifest.appcache'
          }
        ]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-regarde');

  grunt.registerTask('test', ['jshint', 'connect:jasmine', 'jasmine']);
  grunt.registerTask('dist', [
    'test',
    'requirejs',
    'uglify',
    'concat',
    'cssmin',
    'replace:dist',
    'htmlmin',
    'copy:dist',
    'clean:dist'
  ]);
  grunt.registerTask('build', [
    'copy:build',
    'replace:build'
  ]);
  grunt.registerTask('dev', [
    'build',
    'livereload-start',
    'connect:livereload',
    'regarde'
  ]);
  grunt.registerTask('default', ['test', 'build']);

};
