const path = require('path');
// const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './www/src/main.js',
    output: {
        path: path.resolve(__dirname, 'www/dist'),
        filename: './js/bundle.js'
    },
    mode:'development',
    // mode:'production',
    module: {
        rules: [
            {
                test:/\.jsx?$/,
                loader:'babel-loader',
                include: [ path.resolve(__dirname, 'www/src') ],
                exclude:[
                    path.resolve(__dirname,'node_modules')
                ],
                options:{
                    presets:['env','react'],
                    plugins:['transform-object-rest-spread','transform-runtime','transform-decorators-legacy']
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg|cur)(\?.*)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: './images/' // 后面的/不能少
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 100,
                    name: 'media/[name].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 100,
                    name: '/css/fonts/[name].[hash:7].[ext]'
                }
            },
            {
                test:  /\.(css|sass|scss)$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')
                            ],
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.html/,
                use:[
                    'html-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "/css/[name].css"
        }),
        // new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     template: 'www/src/common/template/index.html'
        // }),
        // new webpack.DefinePlugin({ // <-- 减少 React 大小的关键
        //     'process.env': {
        //         // 'NODE_ENV': JSON.stringify('production')
        //         'NODE_ENV': JSON.stringify('development')
        //     }
        // }),
        // new UglifyJsPlugin()
    ],
    // recordsOutputPath: path.join(__dirname, "www/dist", "records.json"),
    externals:{
        'react':'React',
        'react-dom':'ReactDOM',
        'jquery':'$',
        'jquery':'jQuery'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json','.scss'],
        alias: {
            '@src': path.resolve(__dirname,'www/src'),
            '@common':path.resolve(__dirname,'www/src/common'),
            '@actions':path.resolve(__dirname,'www/src/actions'),
            '@reducers':path.resolve(__dirname,'www/src/reducers'),
            '@type':path.resolve(__dirname,'www/src/type'),
            '@base':path.resolve(__dirname,'www/src/base'),
            '@components':path.resolve(__dirname,'www/src/components'),
            '@ui':path.resolve(__dirname,'www/src/components/ui'),
            '@pages':path.resolve(__dirname,'www/src/pages')
        }
    },
    watch:true
};