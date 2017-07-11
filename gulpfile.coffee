################################### Requires ###################################

autoprefixer = require "gulp-autoprefixer"
coffee = require "gulp-coffee"
fs = require "fs"
gulp = require "gulp"
pug = require "gulp-pug"
sourcemaps = require "gulp-sourcemaps"
stylus = require "gulp-stylus"

#################################### Globs #####################################

HTMLWatch = [ "**/*.pug", "!#{__dirname}/layouts/**/*.pug" ]
CSSWatch = [ "**/*.styl" ]
JSWatch = [ "**/*.coffee", "!#{__dirname}/gulpfile.coffee" ]

for a in [ HTMLWatch, CSSWatch, JSWatch ]
	a.push( "!node_modules/**", "!.git/**" )

#################################### Tasks #####################################

global.ROOT = ""

gulp.task "html", ->
	gulp.src HTMLWatch
		.pipe pug
			basedir: __dirname
			doctype: "html"
		.pipe gulp.dest( "." )

gulp.task "css", ->
	gulp.src CSSWatch
		.pipe sourcemaps.init()
		.pipe stylus
			define: ROOT: ROOT
			include: __dirname
		.pipe autoprefixer
			browsers: [ "last 2 versions" ]
			cascade: false
		.pipe sourcemaps.write()
		.pipe gulp.dest( "." )

gulp.task "js", ->
	gulp.src JSWatch
		.pipe sourcemaps.init()
		.pipe coffee()
		.pipe sourcemaps.write()
		.pipe gulp.dest( "." )

################################### Aliases ####################################

gulp.task( "all", [ "html", "css", "js" ] )
gulp.task "watch", ->
	gulp.watch( HTMLWatch, [ "html" ] )
	gulp.watch( CSSWatch, [ "css" ] )
	gulp.watch( JSWatch, [ "js" ] )
gulp.task( "default", [ "all", "watch" ] )
