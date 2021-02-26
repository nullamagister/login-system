const {src, dest, series, parallel, watch} = require('gulp');
const sassCompiler  = require('gulp-sass');
const autoprefixer  = require ('gulp-autoprefixer');
const pugCompiler   = require('gulp-pug');
const sourcemaps    = require('gulp-sourcemaps');
const rename        = require('gulp-rename');
const uglify        = require('gulp-uglify');

//const imagemin = require('gulp-imagemin');

const root = "./src/view/frontend/";
const dist = "./release/view/frontend/"
const fromRoot = (subPath) =>  root + subPath 
const toDist   = (subPath) =>  dist + subPath 

function pug() {
    return src(fromRoot("pug/*.pug"))
        .pipe(pugCompiler({pretty: true}))
        .pipe(dest(toDist("")));
}

function sass() {
    return src([fromRoot("sass/*.scss"), fromRoot("css/*.css")])
        .pipe(sourcemaps.init()) 
        .pipe(sassCompiler({outputStyle: "compressed"}))
        .pipe(autoprefixer("last 3 versions"))
        .pipe(rename({suffix: ".min"}))
        .pipe(sourcemaps.write("maps"))
        .pipe(dest(toDist("css")));
}

function js() {
    return src(fromRoot("js/*.js"))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({suffix: ".min"}))
        .pipe(sourcemaps.write("maps"))
        .pipe(dest(toDist("js")));
}

function imgs() {
    return src(fromRoot("imgs/*.*"))
        //.pipe(imagemin())
        .pipe(dest(toDist("imgs")));
}

function fonts() {
    return src(fromRoot("webfonts/*.*"))
        .pipe(dest(toDist("webfonts")));
}

function watchEach() {
    watch([fromRoot("pug/*.pug")], pug);
    watch([fromRoot("sass/*.scss"), fromRoot("css/*.css")], sass);
    watch(fromRoot("js/*.js"), js);
    watch(fromRoot("imgs/*.*"), imgs)
    watch(fromRoot("webfonts/*.*"), fonts);
}

exports.pug   = pug;
exports.sass  = sass;
exports.js    = js;
exports.imgs  = imgs;
exports.fonts = fonts;

exports.compile = parallel(pug, sass, js, imgs, fonts);
exports.watch   = watchEach;
