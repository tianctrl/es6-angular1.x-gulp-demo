import gulp from 'gulp';
// import path from 'path';

import webpackStream from 'webpack-stream';
import gulpInject from 'gulp-inject';
import gulpHtmlmin from 'gulp-htmlmin';
// import named from 'vinyl-named';
import wiredep from 'wiredep';

import broswerSync from 'browser-sync';
import browserSyncSpa from 'browser-sync-spa';

import gulpSass from 'gulp-sass';
import gulpAutoprefixer from 'gulp-autoprefixer';
import gulpSourcemaps from 'gulp-sourcemaps';

import webpackConfig from './webpack.config';

const browserSyncInstance = broswerSync.create();

/*
 * 编译所有js代码, 输入主模块, 使用webpackStream插件, babel-loader, 打包es6 输出到dist文件夹
 * webpackConfig 为 webpack配置文件
 * named 插件用于保持文件名, 这里可省略
 */
gulp.task('scripts', compileScripts);

/*
 * 给index.html文件插入所需要的css, js文件
 * 使用gulp-inject插件引入自定义的css, js
 * 使用wiredep 引入bower所管理的依赖
 * 此命令依赖于'scripts'命令
 */
gulp.task('index', ['scripts', 'styles'], createIndexFile);

/*
 * 此命令在这里只是把html文件复制到dist目录
 * 这里可使用gulp-htmlmin插件压缩html后, 再写入dist目录
 */
gulp.task('htmlTemplate', htmlTemplate);

/*
 * 编译sass样式文件
 */
gulp.task('styles', compileStyles);

/*
 * 建立httpserver为项目根目录, localhost可访问
 */
gulp.task('serve', ['index', 'htmlTemplate'], serve);

/*
 * 建立httpserver为项目根目录, localhost可访问, 并watch项目
 */
gulp.task('serve-watch', ['watch'], serve);

gulp.task('watch', ['index', 'htmlTemplate'], watchFiles);


function compileScripts() {
    return gulp.src('./app/index_module.js')
        // .pipe(named())
        .pipe(webpackStream(webpackConfig))
        .pipe(gulp.dest('./dist/'));
}

function createIndexFile() {
    let injectStyles = gulp.src('./dist/**/*.css', {read: false});
    let injectScripts = gulp.src('./dist/**/*.js', {read: false});

    let injectOptions = { // 使用相对路径
        relative: true
    };

    let wiredepOptions = { // 不插入jquery
        exclude:[/jquery/]
    };

    return gulp.src('./app/index.html')
        .pipe(gulpInject(injectStyles, injectOptions))
        .pipe(gulpInject(injectScripts, injectOptions))
        .pipe(wiredep.stream(wiredepOptions))
        .pipe(gulp.dest('./dist/'));
}

function htmlTemplate() { // index.html 以外的所有 html 文件
    return gulp.src('./app/**/!(index).html')
        .pipe(gulpHtmlmin({
            removeComments: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
        }))
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSyncInstance.stream());
}

function compileStyles() {
    let sassOptions = {
        style: 'expanded',
    };

    return gulp.src('./app/**/*.scss')
        .pipe(gulpSourcemaps.init())
        .pipe(gulpSass(sassOptions).on('error', gulpSass.logError))
        .pipe(gulpAutoprefixer())
        .pipe(gulpSourcemaps.write('.'))
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSyncInstance.stream());
}

function serve() {
    browserSyncInstance.use(browserSyncSpa({
        selector: '[ng-app]',
      }));

    let config = {
        browser: [],
        directory: false,
        server: {
            baseDir: ['./', './dist/']
        },
        startPath: '/',
        notify: false
    };

    browserSyncInstance.init(config);
}

function watchFiles() {
    gulp.watch(['app/index.html', 'bower.json'], ['index']);

    gulp.watch(['app/**/*.scss'], function(event) {
        if(event.type === 'changed') {
            gulp.start('styles');
        } else {
            gulp.start('index');
        }
    });

    gulp.watch(['app/**/*.html'], ['htmlTemplate']);

    gulp.watch(['app/**/*.js'], ['scripts']);
}