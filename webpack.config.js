const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
module.exports = env => merge(common, {
  devtool: 'source-map', // only for development
  optimization: {}, // for override - warning happens if delete
  devServer: {
    port: 8080,
    hot: true,
    compress: true,
    historyApiFallback: true, // for react-route-dom - sub directory path
    allowedHosts: ['.amazonaws.com']
  },
  plugins: [
    new Dotenv({
      path: `./.env.devserve`, // load this now instead of the ones in '.env'
      // safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      // systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      // silent: true, // hide any errors
      // defaults: false // load '.env.defaults' as the default values if empty.
    }),
    new HtmlWebPackPlugin({
      template: './src/index-serve.html',
      filename: './index.html',
    }),
    new webpack.SourceMapDevToolPlugin({}) // only for development
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }  
});