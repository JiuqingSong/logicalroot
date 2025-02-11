var webpack = require('webpack');
var webpackConfig = require('../webpack.config');
var webpackDevServer = require('webpack-dev-server');

function startWebpackDevServer() {
    var _port = webpackConfig.devServer.port;
        const devServerOptions = Object.assign({}, webpackConfig.devServer, {
            open: true,
            port: _port,
            public: 'localhost:' + _port,
            publicPath: '/scripts',
        });
        webpackConfig.devServer = devServerOptions;
        const compiler = webpack(webpackConfig);
        const server = new webpackDevServer(compiler, devServerOptions);
        server.listen(_port, '127.0.0.1', () => {});
}

+startWebpackDevServer();
