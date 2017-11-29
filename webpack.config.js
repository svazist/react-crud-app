const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin({filename:'[name].bundle.css', allChunks:true})

// "./libs/peer.js",
module.exports = {
    entry: {
        app:["react-hot-loader/patch",'@front/index.dev.js']
        ,
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
        path: path.resolve(__dirname, "./dev-server"),
        filename: '[name].js',
        publicPath:'/',
        chunkFilename: "[id].bundle.js"
    },
    devtool: "source-map",
    devServer :{
        compress: true,
        hot: true,
        inline: true,
        filename: 'bundle.js',
        historyApiFallback: true,
        watchContentBase: true,
        contentBase: path.resolve(__dirname, "./dev-server"),
    },
    resolve: {
        extensions: ['.js', '.jsx','.css','.less'],
        alias: {
            "@front": path.join(__dirname, "src", "front"),
            "@backend": path.join(__dirname, "src", "backend"),
            "@redux": path.join(__dirname, "src", "front", "redux"),
            "@ui": path.join(__dirname, "src", "front", "ui"),
        }
    },
    module:{
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options:{
                    "cacheDirectory": true,
                    "presets": [["es2015", { "modules": false }], "stage-0", "react"],
                    "plugins": [ "react-hot-loader/babel","transform-decorators-legacy" ]
                },
            },
            {
                test: /\.less$/,
                use: extractCSS.extract({
                    fallback: "style-loader",
                    use: "css-loader!less-loader"
                })
            },
            {
                test: /\.css$/,
                // exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'url-loader?limit=10000!img-loader?progressive=true'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'url-loader?name=./fonts/[name].[ext]'
            }
        ],
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        extractCSS,
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production')
            }
        }),
    ]

}