var HtmlWebpackPlugin = require('html-webpack-plugin');
/**
 * 入口文件配置
 */
var entry = {
  'vendor': ['jquery', 'vue'],
  'main': ['./src/main.js'],
  'parser': ['./src/parser/index.js'],
  'login': ['./src/login/index.js']
}

/**
 * 配置生成html页面
 * @param name 生成页面的文件名，与开发时所在的文件夹名字相同
 * @param title 页面的标题
 */
const getHtmlConfig = function (name, title) {
  return {
    template: `./src/${name}/index.html`,
    filename: `./${name}.html`,
    title: title,
    inject: true,
    hash: true,
    chunks: ['vendor', 'manifest', 'main', name]
  };
};
// 配置生成html文件
const htmlWebpackPlugins = [
  new HtmlWebpackPlugin(getHtmlConfig('parser', 'xml')),
  new HtmlWebpackPlugin(getHtmlConfig('login', '用户登录'))
];

module.exports = {
	entry,
	htmlWebpackPlugins
}
