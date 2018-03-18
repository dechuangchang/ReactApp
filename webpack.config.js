const path = require('path');
const webpack = require('webpack');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

var website = {
    "publicPath":"http:cdc.canfreee.com/"
}
website = {
    "publicPath":"/assets/img/"
}
var entry = {
    index:'./app/js/index.js',
    admin:'./app/js/admin.js',
    jquery: "jquery"
}
module.exports = {
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
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract(
                    {
                        use:[{
                        loader: "css-loader" 
                        }, {
                            loader: "less-loader" 
                        }],
                        fallback: "style-loader"
                    }
                )
            },
        // {
        //     test: /\.(png|jpg|gif)$/,
        //     use: [
        //         {
        //             loader: 'url-loader',
        //             options: {
        //                 limit: 1,
        //                 name:'[name]_[hash:6].[ext]',
        //                 outputPath:'assets/img/',
        //                 publicPath:website.publicPath
        //             }
        //         }
        //     ]
        // },
        // {
        //     test: /\.html$/,
        //     use: ['html-withimg-loader']
        // }
        ]
    },
    plugins:[
    //     new webpack.ProvidePlugin({
    //         $:'jquery'
    //     }),
    //     new webpack.optimize.CommonsChunkPlugin({
    //         name: "jquery",
    //         minChunks: Infinity,
    //         filename:"./js/jquery.js"
    //     }),
    //     new UglifyJSPlugin(),
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
    // devServer:{
    //     contentBase:path.resolve(__dirname,'./dist/'), //服务器根路径
    //     host:'127.0.0.1', //ip
    //     compress:true, // 服务端压缩
    //     port:'8002' // 端口
    // }
}