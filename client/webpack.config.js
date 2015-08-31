import webpack from 'webpack';

const webpack_dev = {
    cache: true,
    debug: true,
    devtool: 'cheap-module-eval-source-map',
    entry: "./src/main.js",
    output: {
        path: './build',
        filename: "app.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.styl$/, loader: "style!css!stylus" },
            {
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel-loader'],
                test: /\.js$/
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};

export default webpack_dev;
