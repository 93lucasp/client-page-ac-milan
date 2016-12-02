/**
 * Views Compilation and use-ref Task
 * ===============================
 */



module.exports = function (gulp, $, options) {

    var path = require('path'),
        fs = require('fs'),
        _ = require('lodash'),
        glob = require('glob'),
        through = require('through2'),
        baseData = {},
        paths = options.paths,
        viewPath = path.join(process.cwd(), paths.src.views),
        fixturesPath = path.join(process.cwd(), options.paths.src.fixtures),
        env;


    baseData.PRODUCTION = options.production;
    baseData.page = {};


    function map(renderFn) {

        return through.obj(function (file, enc, cb) {
            if (file.isNull()) {
                this.push(file);
                return cb();
            }
            if (file.isStream()) {
                this.emit(
                    'error',
                    new $.util.PluginError('view-task', 'Streaming not supported')
                );
            }
            try {
                file.contents = new Buffer(renderFn(file.contents.toString(), file.path, file));
            } catch (err) {
                this.emit('error', new $.util.PluginError('view-task', err.toString()));
            }
            this.push(file);
            cb();
        });

    }


    env = require('./lib/view-helpers').nunjucks([viewPath], options);

    env.addGlobal('helpers', require('./lib/view-helpers').helpers(options));
    env.addGlobal('_', _);

    gulp.task('views', function () {

        var data = {};

        glob.sync('{,*/}*.json', {cwd: fixturesPath}).forEach(function (filename) {
            var id = _.camelCase(filename.toLowerCase().replace('.json', ''));
            data[id] = JSON.parse(fs.readFileSync(path.join(fixturesPath, filename), {encoding: 'utf8'}));
        });

        return gulp.src([viewPath + '/{,*/}' + options.viewmatch, '!' + viewPath + '/{,*/}_*.*'])
            .pipe($.plumber({
                errorHandler: $.notify.onError('Error: <%= error.message %>')
            }))
            .pipe(map(function (code) {
                return env.renderString(code, _.assign({}, baseData, data || {}));
            }))
            .pipe($.rename(function (filepath) {
                filepath.basename = filepath.basename.replace('.nunj', '');
            }))
            .pipe(gulp.dest(paths.dist.views))
            .pipe($.if(options.isWatching, $.notify({ message: 'Views rendered', onLast: true })));
    });
};