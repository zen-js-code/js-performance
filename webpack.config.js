'use strict';

const PATH = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeJsPlugin = require("optimize-js-plugin");

const ROOT = PATH.resolve(__dirname, '.');

const NODE_MODULES = PATH.resolve(ROOT, 'node_modules/');
const CACHE_DIR_PATH = PATH.resolve(ROOT, '.cache/');

const SRC = PATH.resolve(ROOT, 'src/client/');
const INDEX = PATH.resolve(SRC, 'index.js');
const INDEX_HTML = PATH.resolve(SRC, 'index.html');

const DIST = PATH.resolve(ROOT, 'dist/client/js');

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
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         NODE_ENV: JSON.stringify('production')
        //     }
        // }),
        // new UglifyJsPlugin({extractComments: true}),
        // new OptimizeJsPlugin({sourceMap: false})
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
