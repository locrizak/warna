module.exports = function(grunt) {
    grunt.initConfig({
        
        jshint: {
            
            files: [
                'gruntfile.js', 
                'warna.js',
            ],
            
            options: {
                globals: {
                    console: true
                }
            }
        },

		mochaTest: {
			test: {
				options: {
					reporter: 'dot'
				},
				src: ['test/**/*.js']
			}
		},

        uglify: {
            options: {
                mangle: true,
                sourceMap: true,
                sourceMapName: 'warna.min.js.map',
                preserveComments: 'some'
            },
            js: {
                files: {
                    'warna.min.js': ['warna.js']
                }
            }
        },
        
        watch: {
            script: {
               options: {
                    spawn: false,
                    event: ['added', 'deleted', 'changed']
                },
                files: ['**/*.js'],
                tasks: ['jshint', 'mochaTest', 'uglify']
            },
            grunt: {
                files: ['Gruntfile.js']
            }
        }
    });
    
    // Load module
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    // Create grunt task
    grunt.registerTask('test', ['mochaTest']);
    grunt.registerTask('build', ['jshint', 'mochaTest', 'uglify']);
};