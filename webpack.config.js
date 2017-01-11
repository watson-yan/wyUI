var webpack = require('webpack')

module.exports = {
   // 插件项
   plugins: [],

   // 页面入口文件配置
   entry: './entry.js',

   // 输出文件配置
   output: {
       path: './dist',
       filename: 'index.js'
   },

   // 加载器配置
   module: {
       loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.scss$/, loader: '!style!css!sass'},
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
            { test: /\.vue$/, loader: 'vue-loader'},
            { test: /\.js$/, exclude: /node_modules/,  loader: 'babel'},
       ]
   },

    // 转化器babel的配置 将ES6语法转换成ES5语法
    babel: { 
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },

    resolve: {
        extensions: ['', '.js', '.jsx']
    }
}