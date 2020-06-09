const webpack = require('webpack')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const pathResolve = target => path.resolve(__dirname, '..', target)

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
            context: pathResolve('dist'),
            // 此处的name要与output中的library一致
            name: '[name]_library',
            path: pathResolve('dll/[name]-manifest.json'),
        })
    ]
}