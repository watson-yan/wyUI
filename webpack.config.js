const webpack = require('webpack')
const path = require('path')

function resolve (dir) {
return path.join(__dirname, '..', dir)
}

module.exports = {
    // 插件项
    plugins: [],

    // 页面入口文件配置
    entry: './entry.js',

    // 输出文件配置
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index.js'
    },
    // resolve: {
    //     extensions: ['.js', '.vue', '.json'],
    //     alias: {
    //         'vue$': 'vue/dist/vue.esm.js',
    //         '@': resolve('static')
    //     }
    // },
    // 加载器配置
    module: {
        rules: [
                {
                    test: /\.(css|scss)$/,
                    loader: 'style-loader!css-loader!postcss-loader!sass-loader'
                },
                {
                    test: /\.(png|jpg)$/,
                    loader: 'url-loader?limit=8192'
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loaders: ['babel-loader', 'eslint']
                }
        ]
    }
}
