const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./config/webpack.config.dev.js');
const compiler = webpack(config);

function addHooks(compiler) {
    compiler.hooks.invalid.tap('server', () => {
        // sendMessage(MESSAGE_TYPE.invalid);
    });
    compiler.hooks.done.tap('server', _stats => {
        console.log('listen compile', {
            stats,

            time: stats.endTime - stats.startTime,
        });
    });
}
// cros
// app.use(
//     cors({
//         origin: true,
//         methods: ['GET', 'HEAD', 'PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
//         credentials: true,
//     })
// );
// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
    webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
    })
);

// Serve the files on port 3000.
app.listen(3000, function () {
    console.log('Example app listening on port 3000!\n');
});
