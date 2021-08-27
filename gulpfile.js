const project_folder = "dist"
const source_folder = "src"



const path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        images: project_folder + "/images/",
        fonts: project_folder + "/fonts/"
    },
    src: {
        // html: [sourse_folder + "/*.html", "!" + sourse_folder + "/_*.html"],
        pug: source_folder + "/*.pug",
        css: source_folder + "/scss/style.scss",
        js: source_folder + "/js/app.js",
        images: source_folder + "/images/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: source_folder + "/fonts/*.ttf"
    },
    watch: {
        // html: sourse_folder + "/**/*.html",
        pug: source_folder + "/**/*.pug",
        css: source_folder + "/scss/**/*.scss",
        js: source_folder + "/js/**/*.js",
        images: source_folder + "/img/**/*.{jpg, png, svg, webp}",
    },
    clean: "./" + project_folder + "/"
}


const fs = require('fs')
const { src, dest, series } = require('gulp')
const { parallel } = require('gulp')
const gulp = require('gulp')
const gulppug = require('gulp-pug')
const browsersync = require('browser-sync').create()
const del = require('del')
const scss = require('gulp-sass')(require('sass'))
const fileinclude = require('gulp-file-include')
const imagemin = require('gulp-imagemin')
const webp = require('gulp-webp')
const webphtml = require('gulp-webp-html')
const clean_css = require('gulp-clean-css')
const rename = require('gulp-rename')
const group_media = require('gulp-group-css-media-queries')
const uglify = require('gulp-uglify-es').default
const ttf2woff = require('gulp-ttf2woff')
const ttf2woff2 = require('gulp-ttf2woff2')
const fonter = require('gulp-fonter')
const deploy = require('gulp-gh-pages')



//<АВТОМАТИЧЕСКОЕ ОБНОВЛЕНИЕ ПРОЕКТА>===========================================================================
const browserSync = () => {
    browsersync.init({
        browser: "google chrome",
        server: {
            baseDir: "./" + project_folder + "/"
        },
        port: 3000,
        notify: false
    })
}
const watchFiles = () => {
    // gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.pug], pug);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.images], imagef);
    gulp.watch([path.watch.js], js);
}

//<Работа с HTML>===========================================================================
// const html = () => {
//     return src(path.src.html)
//         .pipe(fileinclude())
//         .pipe(webphtml())
//         .pipe(dest(path.build.html))
//         .pipe(browsersync.stream())
// }
//<Работа с PUG>===========================================================================
const pug = () => {
    return src(path.src.pug)
        .pipe(
            gulppug({
                pretty: true,
                basedir: __dirname
            }))
        .pipe(webphtml())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}
//<Работа с SCSS>===========================================================================
const css = () => {
    return src(path.src.css)
        .pipe(
            scss({
                outputStyle: "expanded",
                allowEmpty: true
            })
        )
        // .pipe(
        //     group_media()
        // )
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
        .pipe(browsersync.stream())
}
//<Работа с JS>===========================================================================
const js = () => {
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(
            uglify()
        )
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}
//<Работа с IMAGES>===========================================================================
const imagef = () => {
    return src(path.src.images)
        .pipe(
            webp({
                quality: 70
            })
        )
        .pipe(dest(path.build.images))
        .pipe(src(path.src.images))
        .pipe(
            imagemin({
                progressive: true,
                interlaced: true,
                optimizationLevel: 1
            })
        )
        .pipe(dest(path.build.images))
        .pipe(browsersync.stream())
}
//<Работа с FONTS>===========================================================================
const fonts = () => {
    src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts))
    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts))
}
//===============<Конвертация .otf to .ttf>===============
gulp.task('otf2ttf', function () {
    return src([source_folder + "/fonts/*.otf"])
        .pipe(fonter({
            formats: ["ttf"]
        }))
        .pipe(dest(source_folder + "/fonts/"))
})
//===============<Автоподключение шрифтов в файл css>===============
const fontsStyle = () => {
    let file_content = fs.readFileSync(source_folder + '/scss/fonts.scss');
    if (file_content == '') {
        fs.writeFile(source_folder + '/scss/fonts.scss', '', cb);
        return fs.readdir(path.build.fonts, function (err, items) {
            if (items) {
                let c_fontname;
                for (var i = 0; i < items.length; i++) {
                    let fontname = items[i].split('.');
                    fontname = fontname[0];
                    if (c_fontname != fontname) {
                        fs.appendFile(source_folder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
                    }
                    c_fontname = fontname;
                }
            }
        })
    }
}
const cb = () => {

}



//<ОЧИСТКА ПРОДАКШН ПАПКИ>===========================================================================
const clean = () => {
    return del(path.clean)
}


//<DEPLOY ПРОЕКТА>===========================================================================
const deploy_project = () => {
    return src("./dist/**/*")
        .pipe(deploy())
}


const build = gulp.series(clean, gulp.parallel(js, css, pug, imagef, fonts), fontsStyle);
const watch = gulp.parallel(build, watchFiles, browserSync)



exports.fonts = fonts
exports.fontsStyle = fontsStyle
exports.js = js
exports.imagef = imagef
exports.deploy_project = deploy_project
// exports.html = html
exports.pug = pug
exports.css = css
exports.build = build
exports.watch = watch
exports.default = watch