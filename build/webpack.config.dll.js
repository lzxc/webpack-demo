const webpack = require('webpack')
const path = require('path')
const pathResolve = target => path.resolve(__dirname, '..', target)
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: {
        // vue: ['vue', 'vuex', 'vue-router']
        axios: ['axios']
    },
    output: {
        filename: '[name].dll.js',
        path: pathResolve('dist/dll'),
        library: '[name]_dll'
    },
    plugins: [
        new CleanWebpackPlugin(), // 默认路径选取output.path
        new webpack.DllPlugin({
            name: '[name]_dll',
            path: pathResolve('dist/dll/manifest.json')
        }),
    ]
}