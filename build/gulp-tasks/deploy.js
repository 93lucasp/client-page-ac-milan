/**
 * Deploy Related Tasks
 * ===============================
 */

module.exports = function (gulp, $, options) {

    var paths = options.paths,
        hosts = options.hosts;

    function getDeployTarget(target) {
        var targets = Object.keys(hosts).filter(function (host) { return !!hosts[host].host; });

        if (!target || targets.indexOf(target) === -1) {
            $.util.log($.util.colors.red('Error: Deploy target unavailable. Specifiy it via `--remotehost` argument. Allowed targets are: ' + targets.join(', ')));
            return false;
        }
        return hosts[target];
    }

    gulp.task('ftp', function (done) {
        var FTPS = require('ftps'),
            hasbin = require('hasbin'),
            host = getDeployTarget(options.remotehost),
            ftps;



        if (host === false) {
            done();
            return false;
        }

        if (!hasbin.sync('lftp')) {
            $.util.log($.util.colors.red('Error: required `lftp` binary not found in PATH.'));
            done();
            return false;
        }

        ftps = new FTPS({
            host: host.host,
            password: host.password,
            username: host.username
        });

        $.util.log($.util.colors.green('Deploying to target %s (%s)'), options.remotehost, host.host);


        ftps.raw('mirror -p --reverse --delete --verbose --ignore-time ' + paths.dist.root + ' ' + host.path).exec(function (err, response) {
            if (response.error) {
                done(response.error);
            } else {
                if (response.data.length === 0) {
                    $.util.log($.util.colors.cyan('[remote] ') + ' Nothing to sync');
                }
                done();
            }
        }).stdout.on('data', function (res) {
                res.toString().trim().split('\n').forEach(function (line) {
                    $.util.log($.util.colors.cyan('[remote] ') + line.trim());
                });
            });
    });

};

