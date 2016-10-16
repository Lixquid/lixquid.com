const autoprefixer = require( "gulp-autoprefixer" );
const browserSync = require( "browser-sync" ).create();
const gulp = require( "gulp" );
const pug = require( "gulp-pug" );
const stylus = require( "gulp-stylus" );
const watch = require( "gulp-watch" );
const sourcemaps = require( "gulp-sourcemaps" );

function processHTML( src ) {
	return src
		.pipe( pug( {
			basedir: "pug_includes",
			doctype: "html"
		} ) )
		.pipe( gulp.dest( "." ) )
}
function processCSS( src ) {
	return src
		.pipe( sourcemaps.init() )
			.pipe( stylus() )
			.pipe( autoprefixer( {
				browsers: [ "last 2 versions" ],
				cascade: false
			} ) )
		.pipe( sourcemaps.write() )
		.pipe( gulp.dest( "_site/." ) )
}

function globList( args ) {
	if ( !( args instanceof Array ) )
		args = [ args ];
	args.push( "!node_modules/**", "!_site/**", "!.git/**" );
	return args;
}

var HTMLGlob = [ "**/*.pug", "!pug_includes/**" ];
var CSSGlob = [ "**/*.styl" ];

gulp.task( "default", function() {
	processHTML( watch( globList( HTMLGlob ) ) );
	processCSS( watch( globList( CSSGlob ) ) );
} )

gulp.task( "html", function() {
	processHTML( gulp.src( globList( HTMLGlob ) ) );
} )
gulp.task( "css", function() {
	processCSS( gulp.src( globList( CSSGlob ) ) );
} )
