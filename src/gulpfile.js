const gulp = require('gulp');
const path = require('path');
const pug = require('gulp-pug');
const less = require('gulp-less');
const browserSync = require('browser-sync');

const OUTPUT_DIR = '../dist';

gulp.task('pug', function(){
    gulp.src(['pug/index.pug'])
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest(OUTPUT_DIR))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('less', function(){
    return gulp.src('less/styles.less')
        .pipe(less())
        .pipe(gulp.dest(OUTPUT_DIR + '/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', ['less', 'pug'],function(){
    browserSync({
        server: {baseDir: OUTPUT_DIR},
        notify: true
    })
});

gulp.task('watch', function(){
    gulp.watch(['less/**/*.less'], ['less']);
    gulp.watch(['pug/**/*.pug'], ['pug']);
});

gulp.task('default', ['browser-sync', 'watch']);
