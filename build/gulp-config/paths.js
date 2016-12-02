//NOTE: folders are relative to project root folder

var srcRoot = 'frontend';
// var distRoot = 'site/www';
var distRoot = 'site/pigeoncms/pgn-content'; //PIGEON FOLDERS

var paths = {

    src: {
        root: srcRoot,
        assets: srcRoot + '/assets',
        fixtures: srcRoot + '/handlers',
        views: srcRoot + '/views'
    },

    dist: {
        root: distRoot, //where static files are to be saved
        assets: distRoot + '/assets',
        views: 'static' //when working on with CMS, views may be stored in a diffrent folder
    },

    js: 'js',
    sass: 'scss',
    css: 'css',
    images: 'images',
    fonts: 'fonts',
    audio: 'audio',
    video: 'video',
    vendors: 'vendors',

    tmp: '.tmp'
};


module.exports = paths;