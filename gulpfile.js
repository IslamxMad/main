let app = "app"; //Complete folder
let dev = "dev"; //Dev folder

let path = {
    build: {
        html: app + "/",
        css: app + "/css/",
        js: app + "/js/",
        img: app + "/img/",
        fonts: app + "/fonts/"
    },
    
    src: {
        html: dev + "/*html",
        css: dev + "/style/main.scss",
        js: dev + "/js/main.js",
        img: dev + "/img/*",
        fonts: dev + "/fonts/*"
    },

    watch: {
        html: dev + "/**/*.html",
        css: dev + "/style/**/*.scss",
        js: dev + "/js/**/*.js",
        img: dev + "/img/*",
    },

    clean: "./" + app + "/"
};

let {src,dest} = require('gulp');
let gulp = require('gulp');
let browsersync = require('browser-sync').create();
let scss = require('gulp-sass')(require('sass'));
let autoprefixer = require('gulp-autoprefixer');
let cleanCss = require('gulp-clean-css');
let rename = require('gulp-rename');
let imagemin = require('gulp-imagemin');
let webp = require('gulp-webp');
let webphtml = require('gulp-webp-html');
let webpcss = require('gulp-webpcss');


function browserSync(params) {
    browsersync.init({
        server: {
            baseDir: "./" + app + "/"
        },
        port: 3000,
        notify: false
    });
}

function html() {
    return src(path.src.html)
        .pipe(webphtml())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream());
}


function css() {
    return src(path.src.css)
        .pipe(
            scss({
                outputStyle: "expanded"
            })
        )
        .pipe(
            autoprefixer({
                overrideBrowserlist: ["last 7 versions", ">1%"],
                cascade: true
            })
        )
        .pipe(webpcss(
                {
                    webpClass: '.webp',noWebpClass: '.no-webp'
                }
            )
        )
        .pipe(dest(path.build.css))
        .pipe(cleanCss())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream());
}

function js() {
    return src(path.src.js)
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream());
}

function fonts() {
    return src(path.src.fonts)
        .pipe(dest(path.build.fonts))
}


function images() {
    return src(path.src.img)
        .pipe(
            webp({
                quality: 70
            })
        )
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                interlaced: true,
                optimizationLevel: 3 //0 to 7
            })
        )
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}



function watchFiles(params) {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);

}

let build = gulp.series(gulp.parallel(js, css, html, images, fonts));
let watch = gulp.parallel(build, watchFiles, browserSync);


exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;

