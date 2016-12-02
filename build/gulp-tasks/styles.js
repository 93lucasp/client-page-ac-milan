/**
 * Sass and Stylesheets Related Task
 * ===============================
 */

module.exports = function (gulp, $, options) {

    var autoprefixer = require('autoprefixer'),
        lazypipe = require('lazypipe'),
        reloadStream,
        production = options.production,
        sassFunctions = require('./lib/sass-functions')(options),
        productionPipe;

    function reloadStreamFn() {
        if (options.isWatching && options.livereload) {
            return reloadStream || (reloadStream = require('browser-sync').get(options.buildHash).stream);
        }
        return $.util.noop;
    }

    if (production) {
        productionPipe = lazypipe()
            .pipe($.header, options.banners.application, {pkg: options.pkg})
            .pipe($.cleanCss, {
                advanced: false,
                aggressiveMerging: false,
                mediaMerging: false,
                rebase: false
            });
    } else {
        productionPipe = $.util.noop;
    }



    gulp.task('styles', function () {

        // For best performance, don't add Sass partials to `gulp.src`
        return gulp.src([
            options.assetsPath('src.sass', '**/*.{sass,scss}'),
            '!' + options.assetsPath('src.sass', '**/*scsslint_tmp*.{sass,scss}') //exclude scss lint files
        ])
        .pipe($.plumber({
            errorHandler: $.notify.onError('Error: <%= error.message %>')
        }))
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            precision: 10,
            includePaths: [options.assetsPath('src.vendors'), 'node_modules'],
            outputStyle: 'expanded',
            functions: sassFunctions
        }).on('error', $.sass.logError))
        .pipe($.postcss([
            autoprefixer({ browsers: ['> 1%', 'last 2 versions', 'ie 9'] })
        ]))
        .pipe($.if(production, productionPipe()))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(options.assetsPath('dist.css')))
        .pipe(reloadStreamFn()({match: '**/*.css'}))
        .pipe($.if(options.isWatching, $.notify({ message: 'SASS Compiled', onLast: true })))
        .pipe($.size({title: 'styles'}));
    });

};