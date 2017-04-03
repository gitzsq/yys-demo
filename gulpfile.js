var gulp=require('gulp');
var util=require('gulp-util');
var plugins = require('gulp-load-plugins')();//自动加载文件里的gulp插件
var uglifyjs = require('gulp-uglify');//js压缩
var minifyCss = require('gulp-minify-css');//css压缩
var minifyHtml = require('gulp-minify-html');//html压缩
var concat = require('gulp-concat');//文件合并
var less = require('gulp-less');//less编译


//var liverlodad = require('gulp-livereload');//自动刷新页面

var watch=require('gulp-watch');//监视文件变化从而来执行操作



gulp.task('default',function () {
    console.log('小强老湿好');
});
//js压缩
gulp.task('uglifyjs',function () {
    gulp.src('app/src/js/**/*.js')
        .pipe(uglifyjs())
        .pipe(gulp.dest('dis/js'));
});
//css压缩
gulp.task('minify-css',function () {
    gulp.src('app/src/css/**/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'));
});
//html压缩
gulp.task('minify-html',function () {
    gulp.src('app/src/pages/**/*.html')
        .pipe(minifyHtml())
        .pipe(gulp.dest('dist/js'));
});
//js代码检查
gulp.task('jslint',function () {
    gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter());
});
//文件合并
gulp.task('concat',function () {
    gulp.src('bower/**/*.js')
        .pipe(concat('zsq.js'))
        .pipe(gulp.dest('dist/js'));
});
//编译less文件
gulp.task('less',function () {
    gulp.src('less/*.less')
        .pipe(less())
        .pipe(gulp.dest('dist/css'));
});
