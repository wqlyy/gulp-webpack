// 载入gulp外挂程序
var gulp = require('gulp');
// var sass = require('gulp-ruby-sass');//编译Sass文件为 CSS文件
var less = require('gulp-less');//编译less文件为css文件
var autoprefixer = require('gulp-autoprefixer');//解析CSS文件并且添加浏览器前缀到CSS规则里
var minifycss = require('gulp-minify-css');//压缩css文件，减小文件大小，并给引用url添加版本号避免缓存,同[gulp-clean-css]
var jshint = require('gulp-jshint');//检测javascript的语法错误的
var uglify = require('gulp-uglify');//压缩javascript文件，减小文件大小
var imagemin = require('gulp-imagemin');//压缩图片文件（包括PNG、JPEG、GIF和SVG图片）
var rename = require('gulp-rename');//重命名文件
var clean = require('gulp-clean');
var order = require('gulp-order');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var cache = require('gulp-cache');
var livereload = require('gulp-livereload');//实时自动刷新页面
var fileinclude = require('gulp-file-include');
var webpack = require('gulp-webpack');

// 样式
gulp.task('styles', function() {
  return gulp.src('src/css/*.less')
  	  .pipe(less())
  	  .pipe(gulp.dest('dist/css'))
      .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
      .pipe(gulp.dest('dist/css'))
      .pipe(rename({ suffix: '.min' }))
      .pipe(minifycss())
      .pipe(gulp.dest('dist/css'))
      .pipe(notify({ message: 'Styles task complete' }));
});

// 脚本
gulp.task('scripts', function(callback) {
  return gulp.src('src/entry.js')
      .pipe(webpack( require('./webpack.config.js') ))
      .pipe(gulp.dest('dist/js'));
});
//gulp.task('scripts', function() {
//  return gulp.src(['src/**/*.js'])
//      .pipe(order([
//        "lib/jquery-2.0.3.min.js",
//        "lib/*.js",
//        "js/*.js"
//      ]))
//      .pipe(jshint('.jshintrc'))
//      .pipe(jshint.reporter('default'))
//      .pipe(concat('main.js'))
//      .pipe(gulp.dest('dist/js'))
//      .pipe(rename({ suffix: '.min' }))
//      .pipe(uglify())
//      .pipe(gulp.dest('dist/js'))
//      .pipe(notify({ message: 'Scripts task complete' }));
//});

// 图片
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
      .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
      .pipe(gulp.dest('dist/images'))
      .pipe(notify({ message: 'Images task complete' }));
});
//html
gulp.task('html', function() {
  return gulp.src('src/**/*.html')
      .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
      }))
      .pipe(gulp.dest('dist/'))
      .pipe(notify({ message: 'html task complete' }));
});
// 清理
gulp.task('clean', function() {
  return gulp.src(['dist/css', 'dist/js', 'dist/images'], {read: false})
      .pipe(clean());
});

// 预设任务
gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'scripts', 'images', 'html');
});


gulp.task('watch', function() {

  // 看守所有.scss档
  gulp.watch('src/css/**/*.less', ['styles']);

  // 看守所有.js档
  gulp.watch('src/js/**/*.js', ['scripts']);

  // 看守所有图片档
  gulp.watch('src/images/**/*', ['images']);

  //看守html
  gulp.watch('src/**/*.html', ['html']) ;

  livereload.listen();
  gulp.watch(['dist/**']).on('change', livereload.changed);

});