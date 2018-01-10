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
    <body>
      <topbar></topbar>
      <sidebar></sidebar>
        <!-- 这里写主要部分 -->
      <footerbar></footerbar>
    </body>
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

## 开发提示
### 全局使用ajax
对 jQuery 的``ajax``方法进行了封装，由于后台返回的数据格式尚未确定，暂时只进行了最简单的封装。参考 ``/src/common/ajax.js``文件。
### mock数据
为了能在缺少后台接口的情况下进行开发，项目配置了 mock 数据的功能。使用如下：
- 首先要在 ``/mock``下建立``.json``文件，如对应接口为 ``users/queryUser``，建立的文件目录为：
    ```js
        /mock/user/queryUser.json
    ```
- 在使用 `` npm start``启动的开发模式下， ``ajax``请求的 ``url``按照正常的格式传入时，会使用本地 mock 数据,
    如：
    ```js
        ajax({
            url: 'users/queryUser'
        });
    ```
- 如果对某个接口不想使用 mock 数据，请按照一下方式传入 ``url``:
    ```js
        ajax({
            url: address + 'users/queryUser'
        });
    ```
    在``/src/main.js``文件中，已经将 ``address`` 暴露为全局变量，对应后台服务器的地址。
