'use strict';

const PATH = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');

const TARGET = process.env.npm_lifecycle_event;
const PROD = (['build:prod', 'profile1', 'profile2', 'optimize'].indexOf(TARGET) >= 0);

console.log(`Running in ${PROD ? 'production' : 'development'} mode...`);

const ROOT = PATH.resolve(__dirname, '.');

const NODE_MODULES = PATH.resolve(ROOT, 'node_modules/');
const CACHE_DIR_PATH = PATH.resolve(ROOT, '.cache/');

const SRC = PATH.resolve(ROOT, 'src/client/');
const INDEX = PATH.resolve(SRC, 'index.js');
const INDEX_HTML = PATH.resolve(SRC, 'index.html');

const DIST = PATH.resolve(ROOT, 'dist/client/js');

const baseConfig = {
    entry: {
        app: INDEX
    },
    output: {
        filename: '[name].js',
        path: DIST
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js',
            minChunks: (module) => {
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),
        new HtmlWebpackPlugin({
            hash: false,
            filename: '../index.html',
            cache: true,
            inject: true,
            template: INDEX_HTML
        })
    ],
    devtool: 'cheap-module-eval-source-map',
    cache: true,
    watchOptions: {
        ignored: NODE_MODULES
    },
    module: {
        rules: [
            {
                test: /\.js|\.jsx$/,
                include: SRC,
                exclude: [NODE_MODULES],
                use: [{
                    loader: 'babel-loader',
                    query: {
                        cacheDirectory: CACHE_DIR_PATH
                    }
                }]
            }
        ]
    }
};

const prodConfig = {
    devtool: false,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new UglifyJsPlugin({extractComments: true}),
        new OptimizeJsPlugin({sourceMap: false}),
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
};

const config = PROD ? merge({}, baseConfig, prodConfig) : baseConfig;

module.exports = config;
