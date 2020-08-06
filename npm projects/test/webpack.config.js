const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.js',
        modul:'./src/module.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title:"Test project",
            template: "./dist/index1.html"
        })
    ],
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
        {
            test: /\.(png|svg|jpe?g|gif)$/i,
            use:[
                'file-loader',
            ],
        },
        ],
    }
};