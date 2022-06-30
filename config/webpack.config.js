const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
const webpack = require('webpack');
module.exports = env => {
    console.log('env', env);
    return {
        entry: {
            index: './src/index.js',
            // mobile: './src/mobile.js',
            // Runtime code for hot module replacement
            hot: 'webpack/hot/dev-server.js',
            // Dev server client for web socket transport, hot and live reload logic
            client: 'webpack-dev-server/client/index.js?hot=true&live-reload=true',
        },
        mode: env.production ? 'production' : 'development',
        devtool: 'eval-cheap-module-source-map', //inline-source-map source-map
        output: {
            path: path.resolve(__dirname, '../dist'),

            clean: true, //  new CleanWebpackPlugin()功能一样
            // filename: '[name].bundle.js',
            filename: '[name].[contenthash].js', //hash 避免浏览器缓存
            // filename: 'webpack-numbers.js',
            publicPath: '/',
            // library: {
            //     name: 'webpackNumbers',
            //     type: 'umd',
            // },
        },
        devServer: {
            static: '../dist',
            hot: false,
            client: false,
        },

        optimization: {
            // moduleIds: 'deterministic',//固定vendors的id
            runtimeChunk: true,
            splitChunks: {
                name: 'verndors',
                chunks: 'all',
                minSize: 20000,
                minRemainingSize: 0,
                minChunks: 1,
                maxAsyncRequests: 30,
                maxInitialRequests: 30,
                enforceSizeThreshold: 50000,
                // 所有入口代码中公共的
                // cacheGroups: {
                //     commons: {
                //         name: 'commons',
                //         chunks: 'initial',
                //         minChunks: 2,
                //     },
                // },
                // //所有node_modules
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            },
        },
        plugins: [
            //     // new BundleAnalyzerPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new MiniCssExtractPlugin(),
            new HtmlWebpackPlugin({
                // chunks: ['index'],
                filename: 'index.html',
                title: 'index template',
                favicon: 'public/favicon.svg',
                template: 'public/index.html',
            }),
            // new HtmlWebpackPlugin({
            //     chunks: ['mobile'],
            //     filename: 'mobile.html',
            //     title: 'mobile template',
            //     template: 'public/index.html',
            // }),
            new WebpackManifestPlugin(),
        ],
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader, 'css-loader'],
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
};
