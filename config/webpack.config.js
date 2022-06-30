const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
console.log('out', path.resolve(__dirname, '../dist'));
module.exports = {
    entry: {
        index: './src/index.js',
        mobile: './src/mobile.js',
    },
    mode: 'development',
    devtool: 'source-map', //inline-source-map
    output: {
        path: path.resolve(__dirname, '../dist'),
        clean: true, //  new CleanWebpackPlugin()功能一样
        // filename: '[name].bundle.js',
        publicPath: '/',
    },
    devServer: {
        static: '../dist',
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['index'],
            filename: 'index.html',
            title: 'index template',
            favicon: 'public/favicon.svg',
            template: 'public/index.html',
        }),
        new HtmlWebpackPlugin({
            chunks: ['mobile'],
            filename: 'mobile.html',
            title: 'mobile template',
            template: 'public/index.html',
        }),
        new WebpackManifestPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
};
