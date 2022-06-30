const path = require('path');

console.log('process.env.NODE_ENV', process.env.NODE_ENV);

const common = require('./webpack.config.common');
const { merge } = require('webpack-merge');
module.exports = merge(common, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '../dist'),

        clean: true, //  new CleanWebpackPlugin()功能一样
        // filename: '[name].bundle.js',
        filename: '[name].[contenthash].js', //hash 避免浏览器缓存
        // filename: 'webpack-numbers.js',
        publicPath: '/web',
        // library: {
        //     name: 'webpackNumbers',
        //     type: 'umd',
        // },
    },
    devtool: 'eval-cheap-module-source-map', //inline-source-map source-map eval-cheap-module-source-map
});
