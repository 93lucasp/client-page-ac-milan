/**
 * JavaScript Related Task
 * ===============================
 */

module.exports = function (gulp, $, options) {

    var path = require('path'),
        fs = require('fs'),
        _ = require('lodash'),
        webpackConfigDefault = require('../gulp-config/webpack.conf')(options),
        webpack = require('webpack'),
        webpackConfig,
        compiler;

    function getEntryPoints(cwd) {
        var entryObj = {};

        require('glob').sync('./*.js', {
            cwd: cwd
        }).forEach(function (filepath) {
            var entryId = path.basename(filepath, '.js');
            entryObj[entryId] = [filepath];
        });

        return entryObj;
    }


    function compilerCallback(err, stats) {

        $.util.log((stats || {}).toString({
            colors: $.util.colors.supportsColor,
            hash: false,
            timings: false,
            chunks: false,
            chunkModules: false,
            modules: false,
            children: true,
            version: true,
            cached: false,
            cachedAssets: false,
            reasons: false,
            source: false,
            errorDetails: false
        }));

        if (err) {
            throw new $.util.PluginError('webpack', err);
        }
    }

    webpackConfig = _.assign({}, webpackConfigDefault);
    webpackConfig.entry = _.assign({}, webpackConfigDefault.entry, getEntryPoints(webpackConfigDefault.context));


    compiler = webpack(webpackConfig);


    gulp.task('scripts', function (done) {
        compiler.run(function (err, stats) {
            compilerCallback(err, stats);
            if (stats && stats.hasErrors()) {
                done('Error compiling');
            } else {
                done();
            }
        });
    });

    gulp.task('scripts:profile', function (done) {
        var destFile = path.join(process.cwd(), options.assetsPath('dist.js'), 'webpack-profile.json');
        compiler.options.profile = true;
        compiler.profile = true;

        compiler.run(function (err, stats) {
            if (err) {
                throw new $.util.PluginError('webpack', err);
            }
            fs.writeFile(destFile, JSON.stringify(stats.toJson()), null, function (error) {
                if (!error) {
                    $.util.log($.util.colors.green('Profile data saved to ' + destFile));
                    $.util.log($.util.colors.green('Open http://webpack.github.io/analyse/ to analyze them'));
                }
                done(err);
            });
        });
    });

    gulp.task('scripts:watch', function (done) {

        var notifier = $.notify({message: 'Scripts Compiled'}),
            bs = require('browser-sync'),
            del = require('del'),
            browserSync = bs.has(options.buildHash) ? bs.get(options.buildHash) : null,
            watcher;


        function createWatcher(webpackCompiler) {
            return webpackCompiler.watch({
                aggregateTimeout: 200,
                poll: false
            }, function (err, stats) {
                compilerCallback(err, stats);
                if (stats && stats.hasErrors()) {
                    notifier.emit('error', new Error('Compilation error!'));
                } else {
                    notifier.write('Scripts Compiled');
                    browserSync && browserSync.reload();
                }
            });
        }


        notifier.on('error', $.notify.onError({
            message: 'Error: <%= error.message %>'
        }));

        //force watching
        if (!options.isWatching) {
            options.isWatching = true;
        }

        watcher = createWatcher(compiler);

        process.on('exit', function () {
            watcher.close(done);
        });


        gulp.watch('*.js', {cwd: webpackConfig.context}, function (event) {
            var filePathFromSrc;

            //also delete removed entry point
            if (event.type === 'deleted') {
                filePathFromSrc = path.relative(options.assetsPath('src.js'), event.path);
                del.sync(path.resolve(options.assetsPath('dist.js'), filePathFromSrc));
                //also external sourcemap
                del.sync(path.resolve(options.assetsPath('dist.js'), filePathFromSrc + '.map'));
            }

            if (event.type === 'added' || event.type === 'deleted') {
                //update entry point list and restart
                watcher.close();
                webpackConfig.entry = _.assign({}, webpackConfigDefault.entry, getEntryPoints(webpackConfig.context));
                compiler = webpack(webpackConfig);
                watcher = createWatcher(compiler);
            }

        });

    });
};