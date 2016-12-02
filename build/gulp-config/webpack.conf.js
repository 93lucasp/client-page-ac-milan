module.exports = function (options) {

    var path = require('path'),
        _ = require('lodash'),
        webpack = require('webpack');

    var srcPath = path.join(process.cwd(), options.assetsPath('src.js')),
        destPath = path.join(options.assetsPath('dist.js')),
        plugins = [];

    plugins.push(
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'PRODUCTION': options.production,
            'process.env': {
                'NODE_ENV': JSON.stringify(options.production ? 'production' : 'development')
            }
        })
    );

    if (options.production) {
        plugins.push(
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
                compressor: {
                    screw_ie8: true,
                    warnings: false
                }
            }),
            new webpack.BannerPlugin(
                _.template(options.banners.application)(options),
                {entryOnly: true, raw: true}
            )
        );
    }

    return {
        context: srcPath,
        entry: {
            //application: ['babel-polyfill', './app.js']
        },
        output: {
            path: path.join(process.cwd(), destPath),
            publicPath: destPath.replace(options.paths.dist.root, '').replace(/\\/g, '/') + '/',
            filename: '[name].js'
        },
        watch: !!options.isWatching,
        //see https://github.com/webpack/webpack/issues/2145
        //devtool: (options.production ? '#source-map' : '#cheap-module-source-map'),
        devtool: '#source-map',
        debug: (options.production === false),
        plugins: plugins,
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    include: /gsap/, //fix gsap
                    loader: 'imports?define=>false'
                }, {
                    test: /\.js$/,
                    //exclude: /(node_modules|vendors)/,
                    include: [srcPath],
                    loader: 'babel-loader',
                    query: {
                        cacheDirectory: true
                    }
                }, {
                    test: /\.html$/,
                    exclude: /(node_modules|vendors)/,
                    loader: 'raw-loader'
                }, {
                    test: /\.json$/,
                    exclude: /(node_modules|vendors)/,
                    loader: 'json-loader'
                }
            ]
        },
        resolve: {
            modulesDirectories: ['node_modules', options.assetsPath('src.vendors')]
        }
    };
};