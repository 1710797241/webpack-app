const path = require('path');

console.log('process.env.NODE_ENV', process.env.NODE_ENV);

const common = require('./webpack.config.common');
const { merge } = require('webpack-merge');
module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-module-source-map', //inline-source-map source-map cheap-module-source-map
});
