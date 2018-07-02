"use strict";

// Imports /////////////////////////////////////////////////////////////////////

const gulp = require("gulp");
const gulpAutoprefixer = require("gulp-autoprefixer");
const gulpStylus = require("gulp-stylus");
const gulpPug = require("gulp-pug");
const gulpTypescript = require("gulp-typescript");

// Definitions /////////////////////////////////////////////////////////////////

const HTMLTargets = [
    "**/*.pug",
    "!node_modules/**",
    "!resources/**"
];
const CSSTargets = [
    "**/*.styl",
    "!node_modules/**"
];
const JSTargets = [
    "**/*.ts",
    "!node_modules/**"
];

// Functions ///////////////////////////////////////////////////////////////////

function HandleError(err) {
    console.error(err);
    this.emit("end");
}

function CompileHTML() {
    return gulp.src(HTMLTargets)
        .on("error", HandleError)
        .pipe(gulpPug({
            basedir: __dirname,
            doctype: "html"
        }))
        .pipe(gulp.dest("."));
}

function CompileCSS() {
    return gulp.src(CSSTargets)
        .on("error", HandleError)
        .pipe(gulpStylus({
            include: __dirname
        }))
        .pipe(gulpAutoprefixer({
            browsers: ["last 2 versions"],
            cascade: false
        }))
        .pipe(gulp.dest("."));
}

function CompileJS() {
    return gulp.src(JSTargets)
        .on("error", HandleError)
        .pipe(gulpTypescript())
        .pipe(gulp.dest("."));
}

function CompileAll() {
    return gulp.series([
        CompileHTML, CompileCSS, CompileJS
    ]);
}

function WatchAll() {
    gulp.watch("**/*.pug", CompileHTML);
    gulp.watch("**/*.styl", CompileCSS);
    gulp.watch("**/*.ts", CompileJS);
}

// Tasks ///////////////////////////////////////////////////////////////////////

gulp.task("html", CompileHTML);
gulp.task("css", CompileCSS);
gulp.task("js", CompileJS);
gulp.task("all", CompileAll);
gulp.task("watch", WatchAll);
gulp.task("default", WatchAll);