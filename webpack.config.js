'use strict';

const PATH = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const ROOT = PATH.resolve(__dirname, '.');

const NODE_MODULES = PATH.resolve(ROOT, 'node_modules/');
const CACHE_DIR_PATH = PATH.resolve(ROOT, '.cache/');

const SRC = PATH.resolve(ROOT, 'src/client/');
const INDEX = PATH.resolve(SRC, 'index.js');
const INDEX_HTML = PATH.resolve(SRC, 'index.html');

const DIST = PATH.resolve(ROOT, 'dist/js');

const config = {
    entry: {
        app: INDEX
    },
    output: {
        filename: '[name].js',
        path: DIST
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: false,
            filename: '../index.html',
            cache: true,
            inject: true,
            template: INDEX_HTML
        }),
        new UglifyJSPlugin({extractComments: true})
    ],
    cache: true,
    watchOptions: {
        ignored: NODE_MODULES
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: SRC,
                exclude: [NODE_MODULES],
                use: [{
                    loader: 'babel-loader',
                    query: {
                        cacheDirectory: CACHE_DIR_PATH
                    }
                }, {
                    loader: 'eslint-loader'
                }]
            }
        ]
    }
};

module.exports = config;
