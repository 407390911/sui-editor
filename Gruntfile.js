module.exports = function(grunt) {
  'use strict';
  require('load-grunt-tasks')(grunt);

  var editorJS = [
    'editor.js',
    'core/browser.js',
    'core/utils.js',
    'core/EventBase.js',
    'core/dtd.js',
    'core/domUtils.js',
    'core/Range.js',
    'core/Selection.js',
    'core/Editor.js',
    'core/filterword.js',
    'core/node.js',
    'core/htmlparser.js',
    'core/filternode.js',
    'plugins/inserthtml.js',
    'plugins/image.js',
    'plugins/justify.js',
    'plugins/font.js',
    'plugins/link.js',
    'plugins/print.js',
    'plugins/paragraph.js',
    'plugins/horizontal.js',
    'plugins/cleardoc.js',
    'plugins/undo.js',
    'plugins/paste.js',
    'plugins/list.js',
    'plugins/source.js',
    'plugins/enterkey.js',
    'plugins/preview.js',
    'plugins/basestyle.js',
    'plugins/video.js',
    'plugins/selectall.js',
    'plugins/removeformat.js',
    'plugins/keystrokes.js',
    'plugins/autosave.js',
    'plugins/autoupload.js',
    'plugins/formula.js',
    'ui/widget.js',
    'ui/button.js',
    'ui/toolbar.js',
    'ui/menu.js',
    'ui/dropmenu.js',
    'ui/splitbutton.js',
    'ui/colorsplitbutton.js',
    'ui/popup.js',
    'ui/scale.js',
    'ui/colorpicker.js',
    'ui/combobox.js',
    'ui/buttoncombobox.js',
    'ui/modal.js',
    'ui/tooltip.js',
    'ui/tab.js',
    'ui/separator.js',
    'ui/scale.js',
    'adapter/adapter.js',
    'adapter/button.js',
    'adapter/fullscreen.js',
    'adapter/dialog.js',
    'adapter/popup.js',
    'adapter/imagescale.js',
    'adapter/autofloat.js',
    'adapter/source.js',
    'adapter/combobox.js'
  ];

  var concatPath = function(paths, base) {
    return paths.map(function(v) {
      return base + v;
    })
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    distRoot: grunt.option('target') || '.package',
    concat: {
      js: {
        options: {
          banner: '(function($){\n\n',
          footer: '\n\n})(jQuery)'
        },
        src: concatPath(editorJS, './_src/'),
        dest: '<%= distRoot %>/editor/js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        sourceMap: false
      },
      build: {
        src: ['<%= distRoot %>/editor/js/<%= pkg.name %>.js'],
        dest: '<%= distRoot %>/editor/js/<%= pkg.name %>.min.js'
      }
    },
    less: {
      build: {
        src: ['themes/default/less/<%= pkg.name %>.less'],
        dest: '<%= distRoot %>/editor/css/<%= pkg.name %>.css'
      }
    },
    ejs: {
      build: {
        expand: true,
        cwd: '_examples/ejs',
        src: ['**/*.html', '!_*.html'],
        dest: '_examples/',
        ext: '.html'
      }
    },
    copy: {
      configFile: {
        files: [
          { expand: true, cwd: './', src:["sui-editor.config.js"], dest: '<%= distRoot %>/' }
        ]
      },
      images: {
        files: [
          { expand: true, cwd: 'themes/default/images', src:["**/*"], dest: '<%= distRoot %>/editor/images' },
        ]
      },
      dialogs: {
        files: [
          { expand: true, cwd: 'dialogs', src:["**/*"], dest: '<%= distRoot %>/dialogs' },
        ]
      },
      lang: {
        files: [
          { expand: true, cwd: 'lang', src:["**/*"], dest: '<%= distRoot %>/lang' },
        ]
      },
    },
    watch: {
      less: {
        files: ['themes/default/less/**/*.less'],
        tasks: ['less']
      },
      js: {
        files: ['_src/**/*.js'],
        tasks: ['concat']
      }
    }
  });

  grunt.registerTask('default', ["concat", "uglify", "less", 'copy', 'ejs']);

};
