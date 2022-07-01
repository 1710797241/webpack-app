const path = require('path');

const common = require('./webpack.config.common');
const { merge } = require('webpack-merge');
module.exports = merge(common, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '../dist'),

        clean: true, //  new CleanWebpackPlugin()功能一样
        // filename: '[name].bundle.js',
        filename: '[name].[contenthash:8].js', //hash 避免浏览器缓存
        // filename: 'webpack-numbers.js',
        chunkFilename: '[name].[contenthash:8].async.js',
        assetModuleFilename: '[name].[hash:8][ext]',
        publicPath: '/',
        // library: {
        //     name: 'webpackNumbers',
        //     type: 'umd',
        // },
    },
    devtool: 'eval-cheap-module-source-map', //inline-source-map source-map eval-cheap-module-source-map
});
