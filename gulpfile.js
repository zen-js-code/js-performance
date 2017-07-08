'use strict';

const gulp = require('gulp');
const del = require('del');
const webpack = require('webpack');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const config = require('./webpack.config');
const compiler = webpack(config);

const STATS = {
    assets: true,
    cached: false,
    cachedAssets: false,
    children: false,
    chunks: false,
    chunkModules: false,
    colors: true,
    hash: false,
    modules: false,
    reasons: false,
    source: false,
    timings: false,
    version: false
};

function handleOutput(err, stats, done = () => {}) {
    if (!err) {
        console.log(stats.toString(STATS));
        done(null);
    } else {
        console.error(err);
        done(err);
    }
}


const PATHS = {
    src: {
        config: 'src/config/**/*',
        server: 'src/server/**/*'
    },
    dest: {
        root: 'dist/',
        config: 'dist/config/',
        server: 'dist/server/'
    }
};

// Clean

function clean() {
    return del(PATHS.dest.root);
}

// Copy

function buildConfig() {
    return gulp.src(PATHS.src.config).pipe(gulp.dest(PATHS.dest.config));
}

function refreshConfig() {
    return exec('docker restart js-perf');
}

function watchConfig() {
    return gulp.watch(PATHS.src.config, gulp.series(buildConfig, refreshConfig));
}

function buildServer() {
    return gulp.src(PATHS.src.server).pipe(gulp.dest(PATHS.dest.server));
}

function watchServer() {
    return gulp.watch(PATHS.src.server, buildServer);
}

// Build

function buildApp(done) {
    compiler.run((err, stats) => handleOutput(err, stats, done));
}

function watchApp() {
    compiler.watch({ignored: [/node_modules/]}, (err, stats) => handleOutput(err, stats));
}

// Server

function up() {
    return exec('docker-compose up -d --build');
}

function down() {
    return exec('docker-compose down');
}

// Main

const build = gulp.parallel(buildConfig, buildServer, buildApp);
const watch = gulp.parallel(watchConfig, watchServer, watchApp);

gulp.task('build', gulp.series(down, clean, build, up));
gulp.task('watch', gulp.series(down, clean, build, up, watch));
