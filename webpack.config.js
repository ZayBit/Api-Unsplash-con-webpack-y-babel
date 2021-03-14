const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode:'development',
    entry:'./src/app/index.js',
    output:{
        path:path.resolve(__dirname,'bundle'),
        filename:'js/app.bundle.js'
    },
    plugins:[
        new  HtmlWebpackPlugin({
            template:'./src/app/index.html',
            inject:'body',
            minify:{
                collapseWhitespace: true,
                keepClosingSlash: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),
        new MiniCssExtractPlugin({
            filename:'css/app.bundle.css'
        })
    ]
    ,
    module:{
        rules:[
            {test:/\.js$/,exclude:'/node_modules/',loader:'babel-loader'},
            {
                test:/\.s[ac]ss$/i,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',{
                        loader: "sass-loader"
                    }
                ]
            }
        ]
    }
}