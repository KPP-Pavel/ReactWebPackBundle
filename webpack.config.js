const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ProvidePlugin } = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const isDev = process.env.NODE_ENV == 'development'

const path = require('path')

function optimization() {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }
    if (!isDev) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }

    return config
}


module.exports = {
    mode: 'development', //собирать в прод или разработка
    context: path.resolve(__dirname, 'src'),
    entry: ['@babel/polyfill', './index.jsx'], //Точка входа
    output: {
        filename: '[contenthash].bundle.js',
        path: path.resolve(__dirname, 'duild')
    }, //Точка выхода
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],//расширения по умолчанию
        alias: {
            src: path.resolve(__dirname, 'src')//Начало пути
        }
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 3000,
        hot: true, //в последствии isDev
    },
    optimization: optimization(),
    devtool: isDev ? 'source-map' : '',
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',//шаблон
            minify: {
                collapseWhitespace: !isDev
            }

        }),
        new ProvidePlugin({
            React: 'react'
        }),
        new MiniCssExtractPlugin(),
        new ReactRefreshWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src/favicon.ico")
                    ,
                    to: path.relative(__dirname, '.')
                }
            ]
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                }
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-typescript'
                        ]
                    }
                }
            },
            {
                test: /\.tsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-typescript',
                            '@babel/preset-react'
                        ]
                    }
                }
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader', options: { modules: true },
                    },
                    {
                        loader: 'less-loader',
                    }
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader', options: { modules: true },
                    },
                    {
                        loader: 'sass-loader',
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: 'assets',
                        name: '[name].[ext]',
                    },
                }],
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: 'assets',
                        name: '[name].[ext]',
                    },
                }],
            },
            {
                test: /\.svg$/,
                oneOf: [
                    {
                        loader: 'svg-url-loader',
                        issuer: /\.css$/,
                    },
                    {
                        use: 'svg-react-loader',
                    },
                ],
            }

        ]
    }

}
