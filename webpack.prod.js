const path = require('path'),
    webpack = require('webpack'),
    merge = require('webpack-merge'),
    UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
    plugins: [
        new UglifyJSPlugin({
            include: [path.join(__dirname, 'src')],
            sourceMap: true
        })
    ]
});