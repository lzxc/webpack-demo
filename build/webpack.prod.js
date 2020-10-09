const WebpackConfig = require('./webpack.config')
const merge = require('webpack-merge').smart
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const path = require('path')
const pathResolve = target => path.resolve(__dirname, '..', target)
const smp = new SpeedMeasureWebpackPlugin()

module.exports = smp.wrap(merge(WebpackConfig, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  optimization: {
    usedExports: true,
    minimizer: [
      new UglifyJsPlugin(
        {
          // 压缩js
          // cache: true,
          parallel: true,
          sourceMap: true
        }
      ),
      new OptimizeCssAssetsPlugin({})
    ],
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          chunks: 'initial',
          priority: 1, // 设置优先级，首先抽离第三方模块
          test: /node_modules/,
          minSize: 0,
          minChunks: 1 // 最少引入了1次
        }
        // 'moment': {
        //     name: 'moment',
        //     chunks: 'initial',
        //     priority: 5,
        //     test: /[\/]node_modules[\/]moment[\/]/,
        //     minSize: 100,
        //     minChunks: 1 //重复引入了几次
        // },
        //     'modules': {
        //         name: 'modules',
        //         chunks: 'initial',
        //         priority: 5,
        //         test: /[\/]node_modules[\/]core-js-pure[\/]modules[\/]/,
        //         minSize: 100,
        //         minChunks: 1 //重复引入了几次
        //     },
        // common: {
        //     name: 'common',
        //     chunks: 'initial',
        //     minSize: 100, //大小超过100个字节
        //     minChunks: 3 //最少引入了3次
        // }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style/[name].[hash].css',
      chunkFilename: 'style/[id].css'
    })
  ]
}))
