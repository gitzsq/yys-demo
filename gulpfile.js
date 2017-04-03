var gulp=require('gulp');
var util=require('gulp-util');
//var plugins = require('gulp-load-plugins')();//自动加载文件里的gulp插件
var uglifyjs = require('gulp-uglify');//js压缩
var minifyCss = require('gulp-minify-css');//css压缩
var minifyHtml = require('gulp-minify-html');//html压缩
var concat = require('gulp-concat');//文件合并
var less = require('gulp-less');//less编译

var Runsequence= require('run-sequence');
//var liverlodad = require('gulp-livereload');//自动刷新页面

var watch=require('gulp-watch');//监视文件变化从而来执行操作




//js压缩
gulp.task('minJs',function () {
    gulp.src('app/src/js/**/*.js')
        .pipe(uglifyjs())
        .pipe(gulp.dest('dis/js'));
});
//css压缩
gulp.task('minCss',function () {
    gulp.src('app/src/css/**/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'));
});
//html压缩
gulp.task('minHtml',function () {
    gulp.src('app/src/pages/**/*.html')
        .pipe(minifyHtml())
        .pipe(gulp.dest('dist/js'));
});
//js代码检查
// gulp.task('jslint',function () {
//     gulp.src('js/*.js')
//         .pipe(jshint())
//         .pipe(jshint.reporter());
// });
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
//合并所有相关插件
gulp.task('vendor',function () {
    return gulp.src([
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/waypoints/lib/jquery.waypoints.min.js',
        'bower_components/jquery.cookie/jquery.cookie.js',
        'bower_components/jquery.lazyload/jquery.lazyload.js',
        'bower_components/swiper/dist/js/swiper.jquery.min.js',
        'www/scripts/jquery-qrcode-0.14.0.min.js',
        'bower_components/arg.js/dist/arg-1.3.min.js',
        //'bower_components/socket.io-client/socket.io.js',
        'bower_components/toastr/toastr.min.js',
        'bower_components/underscore/underscore-min.js',
        'bower_components/async/dist/async.min.js'
    ]).pipe(concat('vendor.js'))
        .pipe(gulpif(production, uglify()))
        .pipe(gulp.dest('build/js'));
});


//默认任务
gulp.task('default',function (done) {
    Runsequence(['minJs','minCss','minHtml','jsLint','concat','less','vender'],
        done);
});