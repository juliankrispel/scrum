var gulp = require('gulp'),
    coffee = require('gulp-coffee'),
    rename = require('gulp-rename'),
    connect = require('gulp-connect'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    gulpIf = require('gulp-if'),
    clean = require('gulp-clean'),
    gutil = require('gulp-util'),
    browserify = require('gulp-browserify'),
    stylus = require('gulp-stylus');

var deps = [
    'bower_components/angular/angular.js',
    'bower_components/angular-ui-router/release/angular-ui-router.js',
    'src/**/*.coffee'
];

gulp.task('browserify', function(){
    gulp.src(deps)
        .pipe(plumber())
        .pipe(gulpIf(/\.coffee$/, coffee()))
        .on('error', gutil.log)
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('copy-templates', function(){
    gulp.src('./templates/**/*.html', {base: './templates'})
      .pipe(gulp.dest('./public/'));
});

gulp.task('compile-stylus', function(){
    gulp.src('./style/main.styl')
        .pipe(stylus({errors: true}))
        .pipe(rename({basename: 'style', extname: '.css'}))
        .pipe(gulp.dest('./public/css/'));
});

var watcher = gulp.watch(['./src/**/*.coffee', './templates/**/*.html', './style/**/*.styl'], ['browserify', 'copy-templates', 'compile-stylus']);

gulp.task('default', function(){
    watcher.on('change', function(event){
        console.log('File '+event.path+' was '+event.type+', running tasks...');
    });
    connect.server({root: 'public', port: 9002});
    gulp.start('browserify', 'copy-templates', 'compile-stylus');
});
