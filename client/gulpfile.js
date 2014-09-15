var gulp = require('gulp'),
    browserify = require('browserify'),
    markdownify = require('markdownify'),
    gulpif = require('gulp-if'),
    mincss = require('gulp-minify-css'),
    concatcss = require('gulp-concat-css'),
    source = require('vinyl-source-stream'),
    uglify = require('gulp-uglify'),
    streamify = require('gulp-streamify');

var prod = false;

var paths = {
    outputRoot: '../server/assets',
    styles: 'styles/**/*.css'
}

gulp.task('scripts', function () {
    /* Configure Browserify to require markdown documents: */
    var bify = browserify({
        extensions: [ '.md' ]
    });

    /* Set the transform for markdown documents: */
    bify.transform(markdownify);

    /* Add the entry point for Browserify require traversal. */
    bify.add('./src/main.js');

    /* Bundle the results, minify if in prod, output to server and trigger LiveReload */
    return bify.bundle()
        .pipe(source('app.js'))
        .pipe(gulpif(prod, streamify(uglify())))
        .pipe(gulp.dest(paths.outputRoot));
});

gulp.task('styles', function () {
    return gulp.src(paths.styles)
        .pipe(concatcss('styles.css'))
        .pipe(gulpif(prod, mincss()))
        .pipe(gulp.dest(paths.outputRoot));
});

gulp.task('ship', function () {
    prod = true;

    gulp.start('default');
});

gulp.task('default', [ 'scripts', 'styles' ]);
