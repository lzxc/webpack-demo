const webpack = require('webpack')
const webpackProd = require('./webpack.prod')
const merge = require('webpack-merge')
const webpackBundleAnalyz = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = merge(webpackProd, {
    plugins: [
        new webpackBundleAnalyz()
    ]
})