const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
    mode: 'development',
    entry: {
        // app:{import:'./src/index.js', dependOn: 'shared'},
        // module:{import: './src/module.js', dependOn: 'shared'},
        app: './src/index.js',
        modul: './src/module1.js',
        idx: './src/idx.js',
        // shared:'lodash',
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Test project",
            filename: 'index.html',
            template: "./dist/index1.html",
        }),
        // new BundleAnalyzerPlugin(),
        // new CleanWebpackPlugin(),
    ],
    output: {
        // filename: "main.js",
        // filename: '[name].bundle.js',
        filename: '[name].[contenthash].bundle.js',
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
                // use: ['file-loader'],
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name:'[name].[ext]',
                            outputPath:'img/',
                            publicPath:'img/'
                        }
                    }
                ]
            },
        ],
    },
    optimization: {
        splitChunks: {
            chunks: "all",
        }
    }
};