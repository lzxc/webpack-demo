const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWepackPlugin = require('copy-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const pathResolve = target => path.resolve(__dirname, '../', target)
const htmlConfig = require(pathResolve('public/config.js'))[isDev ? 'dev' : 'build']

module.exports = {
  entry: pathResolve('src/index.js'),
  output: {
    path: pathResolve('dist'),
    filename: 'js/[name].[hash:8].js'
  },
  externals: {
    'jquery': 'jQuery',
    '_': 'lodash'
  },
  resolve: {
    alias: {
      '@': pathResolve('src'),
      'assets': pathResolve('src/assets'),
      'views': pathResolve('src/views')
    },
    extensions: ['.js', '.json', '.vue'],
    symlinks: false
  },
  module: {
    // noParse: /jquery|lodash/,
    rules: [
    //   {
    //     enforce: 'pre',
    //     test: /\.(js|vue)$/,
    //     loader: 'eslint-loader',
    //     exclude: /node_modules/,
    //     options: {
    //       emitWarning: true,
    //       formatter: require('eslint-friendly-formatter')
    //     }
    //   },
      {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader'
        }],
        exclude: /node_modules/
      },
      // jsx
      {
        test: /\.js|jsx$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        },
        // include: [
        //   pathResolve('src')
        // ],
        exclude: /node_modules/
      },
      // css
      {
        test: /\.css$/,
        use: [
          isDev ? 'vue-style-loader' : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: pathResolve('dist'),
              hmr: isDev,
              reloadAll: true
            }
          },
          'css-loader',
          'postcss-loader'
        ]
      },
      // less
      {
        test: /\.less$/,
        use: [
          isDev ? 'vue-style-loader' : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: pathResolve('dist'),
              hmr: isDev,
              reloadAll: true
            }
          },
          'css-loader',
          // 'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      // 静态图片
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240, // 10K
              esModule: false,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new ESLintPlugin({
      emitWarning: true,
      formatter: require('eslint-friendly-formatter')
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!img', '!img/**', '!dll', '!dll/**']
    }),
    new CopyWepackPlugin(
      [
        {
          from: 'public/assets/js/*.js',
          to: pathResolve('dist/assets/js'),
          flatten: true,
          ignore: ['other.js']
        }
      ]
    ),

    new webpack.DllReferencePlugin({
      manifest: pathResolve('dll/vendor-manifest.json')
    }),
    new HtmlWebpackPlugin({
      template: pathResolve('public/index.html'),
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: false, // 是否删除属性的双引号
        collapseWhitespace: false // 是否折叠空白
      },
      config: htmlConfig.template
    }),
    new AddAssetHtmlPlugin([
      {
        filepath: pathResolve('dll/*.js')
      }
    ])
  ]
}
