module.exports = function( grunt )
{
	grunt.initConfig( {
		pkg: grunt.file.readJSON('package.json'),
		jade: {
			compile: {
				options: { 
					data: { debug: false, client: false, pretty: true }
				},
				files:
				[ {
					cwd: "./jade",
					src: "**/*.jade",
					dest: "./",
					expand: true,
					ext: ".html" 
				} ]
			}
		},
		copy: {
		  main: {
		    src: 'button.html',
		    dest: 'dogebutton/button.html',
		  },
		},
		sass: {
			dist: {
				options: {
					includePaths: require('node-bourbon').includePaths,
					outputStyle: 'compressed'
				},
				files: {
					'css/index.css' : 'scss/index.scss'
				}
			}
		},
		connect:
		{
			server:
			{
				options:
				{
					port: 8080,
					base: './',
					keepalive: false
				}
			}
		},
		watch: {
			jade:
			{
				files: [ '**/*.jade' ],
				tasks: [ 'jade', 'copy' ],
				options: { livereload:true }
			},
			sass:
			{
				files: [ '**/*.scss' ],
				tasks: [ 'sass' ],
				options: { livereload:false }
			},
		},
	} );

	grunt.loadNpmTasks( 'grunt-contrib-connect');
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  grunt.loadNpmTasks( 'grunt-contrib-concat' );
  grunt.loadNpmTasks( 'grunt-contrib-copy' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-contrib-jade' );
  grunt.loadNpmTasks( 'grunt-sass' );
  grunt.registerTask( 'default', [ 'jade', 'copy', 'sass', 'connect', 'watch'] );

};