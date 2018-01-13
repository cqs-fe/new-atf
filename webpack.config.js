const webpack = require('webpack'),
  path = require('path'),
  UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');;
const baseConfig = require('./build/webpack.base');
const { address: ajaxBaseUrl, baseUrl } = require('./src/common/config'); // 获取ajax地址

function resolve(dir) {
  return path.join(__dirname, dir)
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
        test: require.resolve('jquery'),
        use: [{
            loader: 'expose-loader',
            options: 'jQuery'
        },{
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
    // 压缩代码
    new UglifyJSPlugin({
      include: [resolve('src')],
      sourceMap: true
    }),
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
  ],
  devServer: {
    contentBase: '.',
    port: '9000',
      inline: true,
      hot: true,
      proxy: {
          '*': {
              bypass: function (req, res, proxyOptions) {
                  if (req.url.startsWith(baseUrl)) {
                      req.method = 'GET';
                      console.log('/mock/' + req.url.slice(baseUrl.length) + '.json')
                      return '/mock/' + req.url.slice(baseUrl.length) + '.json';
                  }
              }
          }
      }
  },
}