const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.js',
        enroll: './src/enroll.directive.js',
        print: './src/print.js',
        contr: './src/controller.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
    },
    output: {
        // filename: "main.js",
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        },
        {
            test: /\.html$/,
            loader: 'html-loader',
        },
        {
            test: /\.js$/,
            enforce: 'pre',
            use: ['source-map-loader'],
        },
        ]
    }
};