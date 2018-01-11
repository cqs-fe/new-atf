const webapck = require('webpack'),
    merge = require('webpack-merge');
const common = require('./webpack.common');
const { baseUrl } = require('./src/common/config');

module.exports = merge(common, {
    devServer: {
        contentBase: '.',
        port: 9000,
        inline: true,
        // hot: true,
        proxy: {
            '*': {
                bypass: function (req, res, proxyOptions) {
                    if (req.url.startsWith(baseUrl)) {  
                        // 对于以 /ATFCloud/ 开头的 api 请求，使用本地 mock 数据
                        req.method = 'GET';
                        return '/mock/' + req.url.slice(baseUrl.length) + '.json';
                    }
                }
            }
        }
    }
});