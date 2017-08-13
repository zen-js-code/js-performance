'use strict';

require('v8-compile-cache');

const util = require('util');
const exec = util.promisify(require('child_process').exec);

const gulp = require('gulp');
const del = require('del');
const webpack = require('webpack');
const nodemon = require('nodemon');

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
        server: 'dist/server/',
        serverIndex: 'dist/server/index.js'
    }
};

// Clean

function clean() {
    return del(PATHS.dest.root);
}

// Copy

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

function server() {
    return nodemon({
        verbose: true,
        script: PATHS.dest.serverIndex,
        execMap: {
            js: 'node --inspect --harmony'
        },
        watch: [PATHS.dest.server],
        ext: 'js json html'
    });
}

// Main

const build = gulp.parallel(buildServer, buildApp);
const watch = gulp.parallel(watchServer, watchApp, server);

gulp.task('build', gulp.series(clean, build));
gulp.task('watch', gulp.series(clean, build, watch));
