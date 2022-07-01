const path = require('path');

const common = require('./webpack.config.common');
const { merge } = require('webpack-merge');
module.exports = merge(common, {
    mode: 'development',
    devServer: {
        historyApiFallback: true,
    },
    devtool: 'cheap-module-source-map', //inline-source-map source-map cheap-module-source-map
});
