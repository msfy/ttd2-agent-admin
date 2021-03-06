/* eslint import/no-extraneous-dependencies: off */
import path from 'path'
import webpack from 'webpack'
import webpackBundleAnalyzer from 'webpack-bundle-analyzer'

import conf from './src/conf/conf'

const { env, port, publicPath } = conf
const devPort = port - 1

const src = path.resolve(__dirname, './src')
const lib = path.resolve(__dirname, './node_modules')
const dst = path.resolve(__dirname, './public/static/assets')

const development = {
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    port: devPort,
    https: false,
    compress: true,
    proxy: { '/': { target: `http://localhost:${port}/`, secure: false } },
  },
  context: `${src}`,
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, './src'), lib],
  },
  output: {
    publicPath: `${publicPath}/`,
    filename: '[name]/[name].js',
    path: dst,
  },
  entry: {
    index: [`${src}/web/index.js`],
    common: [
      'axios',
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'react-router-dom',
    ],
  },
  module: {
    rules: [
      {
        include: src,
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['env', { modules: false }], 'stage-0', 'react'],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env || 'development'),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: '[name]/[name].js',
      minChunks: Infinity,
    }),
  ],
}

if (env === 'production') {
  development.plugins.push(new webpackBundleAnalyzer.BundleAnalyzerPlugin())
}

const production = Object.assign({}, development, {
  devtool: 'source-map',
  devServer: undefined,
})

module.exports = Object.assign({}, { development }, { production })[env]
