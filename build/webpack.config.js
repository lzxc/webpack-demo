const path = require('path')
const pathResolve = target => path.resolve(__dirname, '..', target)
const isDev = process.env.NODE_ENV === 'development';
const htmlConfig = require(pathResolve('public/config.js'))[isDev ? 'dev' : 'build']
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWepackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    entry: pathResolve('src/index.js'),
    output: {
        path: pathResolve('dist'),
        filename: 'js/[name].[hash:8].js',
    },
    externals: {
        'jquery': 'jQuery',
    },
    resolve: {
        alias: {
            '@': pathResolve('src'),
            'assets': pathResolve('src/assets')
        },
        extensions: ['.vue', '.js', '.json']
    },
    module: {
        noParse: /jquery|lodash/,
        rules: [
            // jsx
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                },
                include: [
                    pathResolve('node_modules/three'),
                    pathResolve('src')
                ],
            },
            // css
            {
                test: /\.css$/,
                use: [
                    isDev ? 'style-loader' : {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                            hmr: isDev,
                            reloadAll: true
                        }
                    },
                    'css-loader',
                    'postcss-loader',
                ],
                exclude: /node_modules/
            },
            // less
            {
                test: /\.less$/,
                use: [
                    isDev ? 'style-loader' : {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: pathResolve('dist'),
                            hmr: isDev,
                            reloadAll: true
                        }
                    },
                    'css-loader',
                    // 'postcss-loader',
                    'less-loader',
                ],
                exclude: /node_modules/
            },
            // 静态图片
            {
                test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240, //10K
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
            ],
        ),
        new webpack.DllReferencePlugin({
            manifest: pathResolve('dist/dll/manifest.json')
        }),
        new HtmlWebpackPlugin({
            template: pathResolve('public/index.html'),
            filename: 'index.html',
            minify: {
                removeAttributeQuotes: false, //是否删除属性的双引号
                collapseWhitespace: false, //是否折叠空白
            },
            config: htmlConfig.template
        })
    ]
}