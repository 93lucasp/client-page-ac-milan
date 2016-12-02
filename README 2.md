# AQuest Boilerplate 

## Features

* [HTML5 Boilerplate](http://html5boilerplate.com/)
* Static HTML templating with [Nunjucks](https://mozilla.github.io/nunjucks/)
* [Sass](http://sass-lang.com/) 3.4+ with [node-sass](https://github.com/sass/node-sass) and CSS [post-processing](https://github.com/postcss/postcss)
* [Webpack](https://webpack.github.io/) with ES6 support via [babel](https://babeljs.io/)
* Code linting with [eslint](http://eslint.org/) and [scss-lint](https://github.com/brigade/scss-lint)  
* [Gulp.js](http://gulpjs.com/) build and deploy workflow
* [Bower](http://bower.io/)
* Development server and asset live-reload with [BrowserSync](http://www.browsersync.io/)
* Incremental deploy with [lftp](http://lftp.yar.ru/)


## Requirements

* Node.js >= 4.0.0 ([install wiki](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager))
* npm 3+ (`npm install -g npm`)
* bower (`npm install -g bower`)
* gulp cli (`npm install -g gulp`)

## Installation

From project root:

* `bower install` (vendors)
* `npm install` (gulp deps)

### Linting

To enable **JavaScript linting** with eslint install npm packages globally:

```
npm install eslint-plugin-import@1.16.0 eslint-config-airbnb-base@8.0.0 -g
```

Then install the required linter for [your editor](http://eslint.org/docs/user-guide/integrations#editors)

For **SCSS linting** you need [Ruby 2+](http://rubyinstaller.org/downloads/) and scss-lint package:

```
gem install scss_lint
```

Then install the [integration plugin](https://github.com/brigade/scss-lint#editor-integration) for your editor
 

## Configuration

On a plain HTML project, the default configuration should work just fine. On other setups you might need to tweak some paths/options:


1. customize paths and options in `hosts.js`, `paths.js` and `properties.js` files within the `build/gulp-config` folder

1. if needed, edit/add/remove tasks by editing tasks' configuration in `build/gulp-tasks/`.

**Note**: you may override `hosts.js`, `paths.js` and `properties.js` files just for your local codebase by creating a `.local.js` file. Those local files won't be committed in git

## Project Structure

Project sources are located into `frontend` folder. Don't edit files in `static` (static views) or `site/www` (compiled assets) since they will be overwritten during the build process.

### Frontend Folder Structure

    assets
        + fonts #Web Fonts
        + images #Images
        + js #JavaScript files
        + scss #SASS files
        + audio #audio files
        + video #video files
        + vendors #vendors packages installed by bower
    handlers #JSON files
    views #HTML files
        index.html #Main views
    ...

### View Templates

With Nunjucks you can setup extensible page templates. See [official docs](https://mozilla.github.io/nunjucks/templating.html#template-inheritance) for further details.

### View Partials and Sub-folders

Main views and view partials in `frontend/views/partials` are rendered to `static` folder. To prevent rendering prepend a `_` to the filename.

To limit performance issues, just first level sub-folders will be included in the parse process.

### Vendors

You may use [bower](http://bower.io/) to manage vendors. Installed packages will be stored into the `frontend/assets/vendors` folder. It's up to you to provide dev and dist configuration to deploy vendors' files to `site/www`.

## Building

From project root:

`gulp serve` (builds in development mode,  runs a static server on port 10100, watches for change and live-reloads assets)

### Production build

To generate a production ready build add the `--production` parameter:


    gulp --production
    

### Deploy with FTP

If you are on a shared hosting with FTP access, you can switch to the more basic `ftp` task, which uses [lftp](http://lftp.yar.ru) mirroring feature for incremental upload.

#### Usage with external tools

When paired with Phing or other deployment systems, remember to set `buildOnly` to `true` in `build/gulp-config/properties.js` to delegate deploy tasks.

### Other Gulp tasks

* `dev`: one time development build (also runs as default task)
* `bump`: bumps semver version of `package.json` and `bower.json` files. Accepts a `--type` parameter with value `major|minor|patch|prerelease`. Defaults to `patch`. 
