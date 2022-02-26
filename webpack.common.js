const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const LoadashModuleReplacementPlugin = require("lodash-webpack-plugin");
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const configurator = require('@nteract/webpack-configurator');

module.exports = {
    entry: "./index.tsx",
    mode: "development",
    output: {
        publicPath: path.resolve(__dirname, "/nteract/static/dist"),
        filename: "app.js",
        chunkFilename: "chunks.[name].js",
    },
    externals: ["canvas"],
    module: {
        rules: [
            {
                test: /.s?css$/,
                use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"], // MiniCssExtract 로더 적용할 여건이 안됨
            },
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        sourceMap: true
                    }
                },
            },
            {
                test: /\.tsx?$/,
                exclude: path.resolve(__dirname, '/node_modules/'),
                use: [
                    {                    
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                                compilerOptions: {
                                    noEmit: false,
                                },
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            minimize: true,
                        },
                    },
                ],
            },
            {
                test: /(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: "file-loader",
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: "file-loader",
            },
        ],
    },
    resolve: {
        alias: {
            ...configurator.mergeDefaultAliases(),
            react: path.resolve('./node_modules/react'),
            "react-dom": path.resolve('./node_modules/react-dom'),
            redux: path.resolve('./node_modules/redux'),
            "react-redux": path.resolve('./node_modules/react-redux'),
            styles: path.resolve('./public/styles'),
            "url-join": path.resolve('./node_modules/url-join')

        },
        extensions: [".tsx", ".ts", ".js", ".jsx"],
        fallback: {
            crypto: require.resolve("crypto-browserify"),
            path: require.resolve("path-browserify"),
            buffer: require.resolve("buffer/"),
            querystring: require.resolve("querystring-es3"),
            stream: require.resolve("stream-browserify"),
            os: require.resolve("os-browserify/browser"),
            util: require.resolve('util/'),
            fs:false
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[contenthash].css",
        }),
        new HtmlWebpackPlugin({
            template: "public/index.html",
        }),
        new webpack.ProvidePlugin({
            process: "process/browser",
        }),
        new MonacoWebpackPlugin({
            languages:["python"]
        }),
        new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
        new LoadashModuleReplacementPlugin(),
        new ReactRefreshPlugin()
    ],
    target: "web",
    devServer: {
        static: { publicPath: path.resolve(__dirname, "/nteract/static/dist") }, // 원래 publicPath: path.resolve(__dirname, "dist")
        hot: true,
        host: "127.0.0.1",
        port: "10600",
        open: true,
        headers: { "Access-Control-Allow-Origin": "*" }
    },
    devtool:"cheap-module-source-map"
};
