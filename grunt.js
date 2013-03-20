module.exports = function(grunt) {
	grunt.initConfig({
    	concat: {
        client: {
          src: [
            'js/namespaces.js',
            'js/controllers/**/*.js',
            'js/controllers.js',
            'js/services/**/*.js',
            'js/services.js',
            'js/directives/**/*.js',
            'js/directives.js',
            'js/routes.js',
            'js/bootstrap.js',
            'js/**/*.js',
          ],
          dest: 'tmp/javascripts/app.js'
        },
    		libs: {
    			src: [
            'lib/jquery-1.*.js',
            'lib/**/*.js',
    				'tmp/javascripts/*.js'
    			],
    			dest: 'app/app.js'
    		}
    	},

    	min: {
    		prod: {
    			src: 'app.js',
    			dest: 'app.js'
    		}
    	},

      compass: {
        dev: {
          src: 'scss',
          dest: 'app',
          linecomments: true,
          forcecompile: true
        },
        prod: {
          src: 'scss',
          dest: 'app',
          outputstyle: 'compressed',
          forcecompile: true
        }
      },

      watch: {
        scss: {
          files: 'scss/**/*.scss',
          tasks: ['compass:dev']
        },
        js: {
          files: 'js/**/*.js',
          tasks: ['concat:client', 'concat:libs']
        },
        html: {
          files: 'templates/**/*.html',
          tasks: ['insert-partials']
        }
      },

      bgShell: {
        clean: {
          cmd: "rm -rf tmp"
        }
      }
  	});

    grunt.registerTask('insert-partials', function() {
      var template = grunt.file.read('templates/layout.html');
      var partials = '\n<!-- BEGIN: PARTIALS -->\n';

      grunt.file.recurse('templates/partials/', function(abspath, rootdir, subdir, filename) {
        partials += '\n' + grunt.file.read(abspath);
      }, '');

      partials += '\n\n<!-- END: PARTIALS -->\n';
      template = template.replace(/<!-- PARTIALS -->/, partials);

      grunt.file.write('default.html', template);
    });

    grunt.loadNpmTasks('grunt-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bg-shell');

  	grunt.registerTask('default', 'bgShell:clean concat:client concat:libs bgShell:clean');
    
    grunt.registerTask('prod', 'default min:prod compass:prod');
};