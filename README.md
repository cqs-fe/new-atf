# new-atf

> A new version of ATF

## 构建设置

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9000
npm start

# build for production with minification
npm run build

```

## 开发流程

### 编写源文件
- 在src中开发页面，每个页面放在单独的文件夹内，文件夹的名字即为要生成的 ``html`` 文件的名字；
- 在文件夹按如下方式组织各个文件：
  ```js
    src
    |- login
       |- index.html
       |- index.js
  ```
  其中，``index.html``文件主要格式如下:
  ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title><%= htmlWebpackPlugin.options.title %></title>
      <link rel="stylesheet" href="./assets/style/bootstrap.min.css">
    </head>
    <body></body>
    <script src="./assets/lib/bootstrap.min.js"></script>
    </html>
  ```
  注意事项：
  - 需要引入的第三方库如示例代码引入 ``bootstrap.min.js``一样，首先将其放入 ``assets/lib``文件夹下，然后在 ``html``文件的 ``body``标签后中引入。注意**依赖关系**。
  - 需要引入的第三方CSS样式库如示例代码引入``bootstrap.min.css``一样，首先将其放入 ``assets/style``文件夹下，然后在``<head>``标签中引入。

### 更改配置文件
- 在 ``build/webpack.base.js`` 中更改配置文件。
  - 在 ``entry`` 中添加新创建的文件。
    ```js
      /**
      * 入口文件配置
      */
      var entry = {
        'vendor': ['jquery', 'vue'],
        'login': ['./src/login/index.js']
      }
    ```
  - 在 ``htmlWebpackPlugins`` 数组中添加新创建的文件。
    ```js
      // 配置生成html文件
      const htmlWebpackPlugins = [
        new HtmlWebpackPlugin(getHtmlConfig('login', '用户登录'))
      ];
    ```
