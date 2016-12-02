/**
 * Images Task
 * ===============================
 */

module.exports = function (gulp, $, options) {

    var filesMatch = '**/*.{png,jpg,gif,svg,webp}',
        plugins = [];

    plugins.push($.imagemin.svgo({
        plugins: [
            {cleanupIDs: false},
            {removeViewBox: false}
        ]
    }));

    if (options.production) {
        plugins.push(
            $.imagemin.jpegtran({progressive: false}),
            $.imagemin.gifsicle({interlaced: true}),
            $.imagemin.optipng()
        );
    }

    gulp.task('images', function () {

        return gulp.src(options.assetsPath('src.images', filesMatch))
            .pipe($.changed(options.assetsPath('dist.images')))
            .pipe($.imagemin(plugins))
            .pipe(gulp.dest(options.assetsPath('dist.images')))
            .pipe($.if(options.isWatching, $.notify({ message: 'Images Processed', onLast: true })))
            .pipe($.size({title: 'images'}));

    });

};

