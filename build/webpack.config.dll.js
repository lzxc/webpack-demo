const webpack = require('webpack')
const path = require('path')
const pathResolve = target => path.resolve(__dirname, '..', target)
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: {
        vendor: ['vue', 'vuex', 'vue-router', 'axios'],
    },
    output: {
        path: pathResolve('dll'),
        filename: '[name].dll.js',
        library: '[name]_library'
    },
    plugins: [
        new CleanWebpackPlugin(), // 默认路径选取output.path
        new webpack.DllPlugin({
            path: pathResolve('dll/[name]-manifest.json'),
            name: '[name]_library',
        })
    ]
}