const webpack = require('webpack'),
    path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin');
const baseConfig = require('./build/webpack.base'); // 引入多页面的配置
// 工具函数，用于获取当前目录
function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    entry: baseConfig.entry,
    output: {
        path: resolve('dist'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src')]
            }, {
                test: /\.css$/i,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                        options: { minimize: true }
                    }]
                })
            }, {
                test: /\.scss$/,
                include: resolve('src'),
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: { minimize: true }
                    }, {
                        loader: 'sass-loader'
                    }]
                })
            }, {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }, {
                // 用于全局引用jquery
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                }, {
                    loader: 'expose-loader',
                    options: '$'
                }]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.min.js',   // 指定导入vue的源文件使用
            '@': resolve('src')
        }
    },
    plugins: [
        new CleanWebpackPlugin(['./dist'], {
          // allow the plugin to clean folders outside of the webpack root.
          allowExternal: true
        }),
        // 提取公共的依赖
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new ExtractTextPlugin('./style/[name].css'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.$': 'jquery',
            'window.jQuery': 'jquery',
        }),
        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: resolve('assets'),
                to: resolve('dist/assets')
            }
        ]),
        ...baseConfig.htmlWebpackPlugins,
    ]
}
