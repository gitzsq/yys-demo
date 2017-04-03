var gulp=require('gulp');
var util=require('gulp-util');
//var plugins = require('gulp-load-plugins')();//自动加载文件里的gulp插件
var uglify= require('gulp-uglify');//js压缩
var gulpif = require('gulp-if');
var minifyCss = require('gulp-minify-css');//css压缩
var minifyHtml = require('gulp-minify-html');//html压缩
var concat = require('gulp-concat');//文件合并
var less = require('gulp-less');//less编译



var watch=require('gulp-watch');//监视文件变化从而来执行操作
var Runsequence= require('run-sequence');

var connect = require('gulp-connect');
var browserSync = require('browser-sync').create();

var livereload = require('gulp-livereload');//自动刷新页面



var production=false;


//js压缩
gulp.task('minJs',function () {
    gulp.src('js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});
//css压缩
gulp.task('minCss',function () {
    gulp.src('css/**/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'));
});
//html压缩
gulp.task('minHtml',function () {
    gulp.src('views/**/*.html')
        .pipe(minifyHtml())
        .pipe(gulp.dest('dist/views'));
});

//编译less文件
gulp.task('less',function () {
    gulp.src('less/*.less')
        .pipe(less())
        .pipe(gulp.dest('dist/css'));
});
//合并所有相关js插件
gulp.task('vendor',function () {
    return gulp.src([
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/jquery.cookie/jquery.cookie.js',
        'bower_components/toastr/toastr.min.js',
        'bower_components/underscore/underscore-min.js'
    ]).pipe(concat('vendor.js'))
        .pipe(gulpif(production, uglify()))
        .pipe(gulp.dest('js'));
});


//合并相关样式插件为一个main.css文件   直接引入这一个就好
gulp.task('mainCss',function () {
    return gulp.src([
        'bower_components/bootstrap/dist/css/bootstrap.css'
    ]).pipe(concat('main.css'))
        .pipe(gulpif(production, minifyCss()))
        .pipe(gulp.dest('css'));
});

//使用connect启动一个Web服务器
gulp.task('connect', function () {
    connect.server({
        root: 'local',
        port: 8080,
        livereload: true
    });
});

//先编译less文件，然后在自动刷新
gulp.task('serve',['less'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch('less/**/*.less', ['less']);
    gulp.watch('index.html').on('change',browserSync.reload());
    gulp.watch('**/*.html').on('change', browserSync.reload);
    gulp.watch('js/**/*.js').on('change', browserSync.reload);

});

//开启静态服务
gulp.task('serve', function() {

    browserSync.init({
        server: "./"
    });
    // gulp.watch('index.html').on('change',browserSync.reload());
    gulp.watch('css/*.css').on('change', browserSync.reload);
    gulp.watch('**/*.html').on('change', browserSync.reload);
    gulp.watch('js/**/*.js').on('change', browserSync.reload);

});


//默认任务
gulp.task('default',function (done) {
    Runsequence(['minJs','minCss','minHtml','less','vendor','mainCss','connect','serve'],
        done);
});