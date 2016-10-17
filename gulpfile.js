const autoprefixer = require( "gulp-autoprefixer" );
const gulp = require( "gulp" );
const pug = require( "gulp-pug" );
const stylus = require( "gulp-stylus" );
const watch = require( "gulp-watch" );
const sourcemaps = require( "gulp-sourcemaps" );

// Globs //

var HTMLWatch = [ "**/*.pug" ];
var HTMLRender = [ "**/*.pug", "!pug_includes/**" ];
var CSSWatch = [ "**/*.styl" ];
var CSSRender = [ "**/*.styl" ];

HTMLWatch.push( "!node_modules/**", "!_site/**", "!.git/**" );
HTMLRender.push( "!node_modules/**", "!_site/**", "!.git/**" );
CSSWatch.push( "!node_modules/**", "!_site/**", "!.git/**" );
CSSRender.push( "!node_modules/**", "!_site/**", "!.git/**" );

// Processes //

gulp.task( "html", function() {
	return gulp.src( HTMLRender )
		.pipe( pug( {
			basedir: "pug_includes",
			doctype: "html"
		} ) )
		.pipe( gulp.dest( "." ) )
} );

gulp.task( "css", function() {
	return gulp.src( CSSRender )
		.pipe( sourcemaps.init() )
			.pipe( stylus() )
			.pipe( autoprefixer( {
				browsers: [ "last 2 versions" ],
				cascade: false
			} ) )
		.pipe( sourcemaps.write() )
		.pipe( gulp.dest( "." ) )
} );

gulp.task( "all", [ "html", "css" ] )

gulp.task( "watch", function() {
	gulp.watch( HTMLWatch, [ "html" ] );
	gulp.watch( CSSWatch, [ "css" ] );
} )

gulp.task( "default", [ "watch" ] )

// function processHTML( src ) {
// 	return src
// 		.pipe( pug( {
// 			basedir: "pug_includes",
// 			doctype: "html"
// 		} ) )
// 		.pipe( gulp.dest( "." ) )
// }
// function processCSS( src ) {
// 	return src
// 		.pipe( sourcemaps.init() )
// 			.pipe( stylus() )
// 			.pipe( autoprefixer( {
// 				browsers: [ "last 2 versions" ],
// 				cascade: false
// 			} ) )
// 		.pipe( sourcemaps.write() )
// 		.pipe( gulp.dest( "_site/." ) )
// }

// function globList( args ) {
// 	if ( !( args instanceof Array ) )
// 		args = [ args ];
// 	args.push( "!node_modules/**", "!_site/**", "!.git/**" );
// 	return args;
// }

// var HTMLGlob = [ "**/*.pug", "!pug_includes/**" ];
// var CSSGlob = [ "**/*.styl" ];

// gulp.task( "default", function() {
// 	processHTML( watch( globList( HTMLGlob ) ) );
// 	processCSS( watch( globList( CSSGlob ) ) );
// } )

// gulp.task( "html", function() {
// 	processHTML( gulp.src( globList( HTMLGlob ) ) );
// } )
// gulp.task( "css", function() {
// 	processCSS( gulp.src( globList( CSSGlob ) ) );
// } )
