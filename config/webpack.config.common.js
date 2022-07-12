const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const FastRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin/lib');
const smp = new SpeedMeasureWebpackPlugin();
const HP = require('./plugin/index');
const handler = (percentage, message, ...args) => {};

const webpack = require('webpack');
const config = {
    entry: {
        index: './src/index.js',
        mobile: './src/mobile.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),

        clean: true, //  new CleanWebpackPlugin()功能一样
        // filename: '[name].bundle.js',
        filename: '[name].[contenthash].js', //hash 避免浏览器缓存
        // filename: 'webpack-numbers.js',
        publicPath: '/'
        // library: {
        //     name: 'webpackNumbers',
        //     type: 'umd',
        // },
    },
    stats: {
        logging: 'none',
        loggingDebug: false,
        loggingTrace: false
    },
    devServer: {
        static: '../dist'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    optimization: {
        // moduleIds: 'deterministic',//固定vendors的id
        sideEffects: true, //treeshaking
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
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        //     // new BundleAnalyzerPlugin(),

        new webpack.ProgressPlugin(handler),
        new FastRefreshPlugin(),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            chunks: ['index'],
            filename: 'index.html',
            title: 'index template',
            favicon: 'public/favicon.svg',
            template: 'public/index.html'
        }),
        new HtmlWebpackPlugin({
            chunks: ['mobile'],
            filename: 'mobile.html',
            title: 'mobile template',
            template: 'public/index.html'
        }),
        new WebpackManifestPlugin(),
        new SpeedMeasureWebpackPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            _: 'lodash'
        }),
        new HP()
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                mode: 'local',
                                localIdentName: '[local]___[hash:base64:5]'
                            }
                        }
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(js|jsx)$/i,
                loader: 'esbuild-loader',
                options: {
                    loader: 'jsx', // Remove this if you're not using JSX
                    target: 'es2015' // Syntax to compile to (see options below for possible values)
                }
            }
            // {
            //     test: /\.(js|jsx)$/i,
            //     exclude: /node_modules/,
            //     use: {
            //         loader: 'babel-loader',
            //         options: {
            //             presets: [
            //                 ['@babel/preset-env', { targets: 'defaults' }],
            //                 ['@babel/preset-react']
            //             ]
            //         }
            //     }
            // }
        ]
    }
};

module.exports = config;
