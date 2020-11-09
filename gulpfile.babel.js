import gulp from 'gulp'
// gulp.watch 的用法是当文件发生变化的时候, 调用相关任务
import {
    series,
    watch,
} from 'gulp'
import babel from 'gulp-babel'
// 用 sass 来把 scss 文件转成 css 文件
import sass from 'gulp-sass'
// 精简 css 文件
import cleanCss from 'gulp-clean-css'
// 混淆 js 文件
import uglify from 'gulp-uglify'
import sourcemaps from 'gulp-sourcemaps'

import gulp2k from './plugin/gulp-2k'

const style = () => {
    // glob 模式
    // 多个目录或者文件可以使用数组的形式
    let src = [
        'static/css/**/*.css',
        'static/css/**/*.scss',
    ]
    let build = 'build/css'
    let stream = gulp.src(src)
        .pipe(sass())
        .pipe(cleanCss())
        .pipe(gulp2k())
        .pipe(gulp.dest(build))
    return stream
}

const script = () => {
    let src = 'static/js/**/*.js'
    let build = 'build/js'
    let stream = gulp.src(src)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp2k())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(build))
    return stream
}

const watchFiles = () => {
    let styleSrc = [
        'static/css/**/*.css',
        'static/css/**/*.scss',
    ]
    // css 文件发生变化的时候执行 style 任务
    watch(styleSrc, style)

    // js 文件发生变化的时候执行 js 任务
    let scriptSrc = 'static/js/**/*.js'
    watch(scriptSrc, script)
}

// es6 的导出使用不如 node 的导出方便
// 这里导出了 default 和 watch 这两个任务, 也就是说可以直接在命令行使用这两个命令
exports.default = series(style, script)
exports.watch = watchFiles