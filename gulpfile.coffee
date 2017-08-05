################################### Requires ###################################

autoprefixer = require "gulp-autoprefixer"
cs = require "coffee-script"
coffee = require "gulp-coffee"
fs = require "fs"
path = require "path"
gulp = require "gulp"
pug = require "pug"
pugGulp = require "gulp-pug"
sourcemaps = require "gulp-sourcemaps"
stylus = require "gulp-stylus"

global.ROOT = ""

#################################### Globs #####################################

HTMLWatch = [ "**/*.pug" ]
HTMLRender = [
	"**/*.pug"
	"!blog/**"
	"!resources/**"
]
BlogWatch = [ "blog/posts/*.pug" ]
CSSWatch = [ "**/*.styl" ]
JSWatch = [ "**/*.coffee", "!gulpfile.coffee" ]

for a in [ HTMLWatch, HTMLRender, CSSWatch, JSWatch, BlogWatch ]
	a.push( "!node_modules/**", "!.git/**" )

#################################### Tasks #####################################

gulp.task "html", ->
	try
		gulp.src HTMLRender
			.pipe pugGulp
				basedir: __dirname
				doctype: "html"
			.pipe gulp.dest( "." )
	catch ex
		console.error ex

gulp.task "css", ->
	try
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
	catch ex
		console.error ex

gulp.task "js", ->
	try
		gulp.src JSWatch
			.pipe sourcemaps.init()
			.pipe coffee()
			.pipe sourcemaps.write()
			.pipe gulp.dest( "." )
	catch ex
		console.error ex

gulp.task "blog", ->
	try

		compilePugFile = ( from, to, locals = {} ) ->
			if not to
				to = from.replace( /\.[^.]+$/, ".html" )

			fs.writeFileSync( to,
				pug.compileFile( from, {
					basedir: __dirname
					doctype: "html"
				} )( locals ) )

		posts = []

		## Generate Post Data ##

		post_filenames = fs.readdirSync "#{__dirname}/blog/posts"
			.filter ( f ) -> path.extname( f ) == ".pug"
			.map ( f ) ->
				full: path.join( "#{__dirname}/blog/posts", f )
				short: f
			.filter ( f ) -> fs.statSync( f.full ).isFile()

		for f in post_filenames
			lines = fs.readFileSync( f.full, encoding: "utf8" ).split( "\n" )
			continue if lines[0] != "//-"

			data = null

			index = null
			for l, i in lines
				if l.match( /^\S/ ) and i != 0
					index = i
					break

			continue if index == null

			data = cs.eval( lines
				.slice( 1, index - 1 )
				.map ( l ) -> l.trim()
				.join( "\n" ) )

			if data.date
				data.date = new Date( data.date )
			data.short_filename = f.short
			data.full_filename = f.full
			data.url = ROOT + "/blog/posts/" +
				f.short.replace( /\.[^.]+$/, ".html" )

			posts.push data

		posts.sort ( a, b ) ->
			a.date < b.date

		## Build Posts ##

		for post, i in posts
			post.next = post[ i + 1 ]
			post.prev = post[ i - 1 ]

			compilePugFile(
				post.full_filename,
				null,
				post: post )

		## Build Index ##

		compilePugFile( "#{__dirname}/blog/index.pug", null, posts: posts )

		## Build Tag Data ##

		tags = {}
		for post in posts
			continue if not post.tags
			for tag in post.tags
				if not tags[ tag ]
					tags[ tag ] = []
				tags[ tag ].push post

		## Render Tag Layout ##

		compilePugFile( "#{__dirname}/blog/tags/index.pug", null, tags: tags )

		for tag, posts of tags
			# global.posts = posts
			try fs.mkdirSync( "#{__dirname}/blog/tags/#{tag}" )
			compilePugFile(
				"#{__dirname}/blog/index.pug",
				"#{__dirname}/blog/tags/#{tag}/index.html",
				posts: posts )

	catch ex
		console.error ex



################################### Aliases ####################################

gulp.task( "all", [ "html", "css", "js", "blog" ] )
gulp.task "watch", ->
	gulp.watch( HTMLWatch, [ "html" ] )
	gulp.watch( CSSWatch, [ "css" ] )
	gulp.watch( JSWatch, [ "js" ] )
	gulp.watch( BlogWatch, [ "blog" ] )
gulp.task( "default", [ "all", "watch" ] )
