
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const staticSourcePath = path.join(__dirname, 'static');
const sourcePath = path.join(__dirname, './js');
const buildPath = path.join(__dirname, 'dist');
const cleanPath = buildPath+"/*";


module.exports = {
    // devtool: 'cheap-module-source-map',
    entry: {
        app: [
            'babel-polyfill',
            '@front/app.production.js'
        ],

        vendor:[
            "axios" ,
            "history" ,
            "react" ,
            "react-dom" ,
            "react-redux" ,
            "react-router" ,
            "redux" ,
            "react-router-redux" ,
            "redux-thunk",
        ]
    },
    output: {
        path: buildPath,
        filename: '[name].[chunkhash].js',
        publicPath: ''
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.less'],
        modules: [
            sourcePath,
            path.resolve(__dirname, 'node_modules')
        ],
        alias: {
            "@front": path.join(__dirname, "src", "front"),
            "@backend": path.join(__dirname, "src", "backend"),
            "@redux": path.join(__dirname, "src", "front", "redux"),
            "@ui": path.join(__dirname, "src", "front", "ui"),
        }

    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new CleanWebpackPlugin(cleanPath),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks (module) {
                return module.context && module.context.indexOf('node_modules') >= 0;
            }
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true
            },
            output: {
                comments: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                // context: staticSourcePath
            }
        }),
        new webpack.HashedModuleIdsPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.ejs'),
            path: buildPath,
            excludeChunks: ['base'],
            filename: 'index.html',
            minify: {
                collapseWhitespace: false,
                collapseInlineTagWhitespace: false,
                removeComments: true,
                removeRedundantAttributes: true
            }
        }),
        new ExtractTextPlugin({
            filename: '[name].[hash].css',
            allChunks: true
        }),
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options:{
                    "cacheDirectory": true,
                    "presets": [["es2015", { "modules": false }], "stage-0", "react"],
                    "plugins": [ "react-hot-loader/babel" ]
                },
            },
            {
                test: /\.css$/,
                // exclude: /node_modules/,
                include: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        'css-loader'
                    ]
                })
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use:[
                        'css-loader',
                        'less-loader',
                    ]
                })
            },
            {
                test: /\.(eot?.+|svg?.+|ttf?.+|otf?.+|woff?.+|woff2?.+)$/,
                use:  [
                    'url-loader?limit=10000'
                ]
            },
            {
                test: /\.(png|gif|jpg|svg)$/,
                use: [
                    'url-loader?limit=10000'
                ]
            }
        ]
    }
};
