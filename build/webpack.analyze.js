const webpackProd = require('./webpack.prod')
const merge = require('webpack-merge')
const WebpackBundleAnalyz = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = merge(webpackProd, {
  plugins: [
    new WebpackBundleAnalyz()
  ]
})
