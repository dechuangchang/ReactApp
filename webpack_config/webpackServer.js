const path = require('path');
const webpack = require('webpack');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

var entry = {
    index:'./app/js/index.js',
    admin:'./app/js/admin.js',
    jquery: "jquery"
}
module.exports = {
    devtool: "source-map",
    entry:entry,//入口
    output:{
        path:path.resolve(__dirname,'output'),//输出真是硬盘位置
        filename:'./js/[name].js', 
    },
    module:{
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-modulemodule",
                    use: "css-loader"
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract(
                    {
                        use:[{
                            loader: "css-loader" ,
                            options: { sourceMap: true, importLoaders: 1 }
                        }, {
                            loader: "less-loader" ,
                            options: { sourceMap: true }
                        }],
                        fallback: "style-loader"
                    }
                )
            },
        {
            test: /\.(png|jpg|gif)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 1,
                        name:'[name]_[hash:6].[ext]',
                        outputPath:'/img/',
                        publicPath:'http://127.0.0.1:8002/img/'
                    }
                }
            ]
        },
        {
            test: /\.js$/,
            use: [{
              loader: 'babel-loader',
              options: {
                 presets: ['es2015']
              }
            }],
            exclude: /node_modules/, 
            
        },
        {
            test: /\.html$/,
            use: ['html-withimg-loader']
        }
        ]
    },
    plugins:[
        new webpack.ProvidePlugin({
            $:'jquery'
        }),
        new UglifyJSPlugin({
            test: /\.js$/,
            exclude: /node_modules/,
            sourceMap:true
        }),
        new HtmlWebpackPlugin({
            minify:{
                removeAttributeQuotes:true
            },
            hash:true,
            filename: 'index.html',
            chunks: ['index','jquery'],
            template:'./app/index.html'
        }),
        new HtmlWebpackPlugin({
            minify:{
                removeAttributeQuotes:true
            },
            hash:true,
            filename: 'admin.html',
            chunks: ['admin','jquery'],
            template:'./app/admin.html'
        }),
        new ExtractTextPlugin("./css/[name].css"),
    ],
    devServer:{
        contentBase:path.resolve(__dirname,'./output/'), //服务器根路径
        host:'127.0.0.1', //ip
        compress:true, // 服务端压缩
        port:'8002' // 端口
    }
}