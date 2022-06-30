const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const config = {
    mode: 'development',
    entry: [
        // Runtime code for hot module replacement
        'webpack/hot/dev-server.js',
        // Dev server client for web socket transport, hot and live reload logic
        'webpack-dev-server/client/index.js?hot=true&live-reload=true',
        // Your entry
        './src/index.js',
    ],
    devtool: 'inline-source-map',
    plugins: [
        // Plugin for hot module replacement
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'Hot Module Replacement',
        }),
        new MiniCssExtractPlugin(),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
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
const compiler = webpack(config);

// `hot` and `client` options are disabled because we added them manually
const server = new webpackDevServer({ hot: false, client: false }, compiler);

(async () => {
    await server.start();
    console.log('dev server is running');
})();
