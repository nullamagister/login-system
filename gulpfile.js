const {src, dest, series, parallel, watch} = require('gulp');
const sassCompiler  = require('gulp-sass');
const autoprefixer  = require ('gulp-autoprefixer');
const pugCompiler   = require('gulp-pug');
const sourcemaps    = require('gulp-sourcemaps');
const rename        = require('gulp-rename');
const uglify        = require('gulp-uglify');
const connect       = require('gulp-connect');
const image         = require('gulp-image');

const rootPath = "./src/view/frontend/";
const distPath = "./release/view/frontend/"
const port = 8000;
const index = "index.html"

const fromRoot = (path) =>  rootPath + path 
const toDist   = (path) =>  distPath + path

function pug() {
    return src(fromRoot("pug/*.pug"))
        .pipe(pugCompiler({pretty: true}))
        .pipe(dest(toDist("")))
        .pipe(connect.reload());
}

function pugRedirect() {
    return src(fromRoot("pug/**/*.pug"))
        .pipe(dest(toDist("pug")))
        .pipe(connect.reload());
}

function sass() {
    return src([fromRoot("sass/*.scss"), fromRoot("css/*.css")])
        .pipe(sourcemaps.init()) 
        .pipe(sassCompiler({outputStyle: "compressed"}))
        .pipe(autoprefixer("last 3 versions"))
        .pipe(rename({suffix: ".min"}))
        .pipe(sourcemaps.write("maps"))
        .pipe(dest(toDist("css")))
        .pipe(connect.reload());
}

function js() {
    return src(fromRoot("js/*.js"))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({suffix: ".min"}))
        .pipe(sourcemaps.write("maps"))
        .pipe(dest(toDist("js")))
        .pipe(connect.reload());
}

function imgs() {
    return src(fromRoot("imgs/*.*"))
        .pipe(image())
        .pipe(dest(toDist("imgs")))
        .pipe(connect.reload());
}

function fonts() {
    return src(fromRoot("webfonts/*.*"))
        .pipe(dest(toDist("webfonts")))
        .pipe(connect.reload());
}

function watchEach() {
    connect.server({livereload: true, root: distPath, port, index});
    watch([fromRoot("pug/*.pug"), fromRoot("pug/**/*.pug")], pug);
    watch([fromRoot("sass/*.scss"), fromRoot("sass/**/*.scss"), fromRoot("css/*.css")], sass);
    watch([fromRoot("js/*.js"), fromRoot("js/**/*.js")], js);
    watch([fromRoot("imgs/*.*"), fromRoot("imgs/**/*.*")], imgs);
    watch([fromRoot("webfonts/*.*"), fromRoot("webfonts/**/*.*")], fonts);
}

exports.pug         = pug;
exports.pugRedirect = pugRedirect
exports.sass        = sass;
exports.js          = js;
exports.imgs        = imgs;
exports.fonts       = fonts;

exports.compile = parallel(pugRedirect, sass, js, imgs, fonts);
exports.watch   = watchEach;
exports.default = series(parallel(series(pug, pugRedirect), sass, js, imgs, fonts), watchEach);
