const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
module.exports = env => merge(common, {
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: `//s3.ap-northeast-2.amazonaws.com/userconsole.datamplan.com-${env.PRODUCT}/`,
    filename: '[name].min.js',
  },
  plugins: [
    new Dotenv({
      path: `./.env.${env.STAGE}`, // load this now instead of the ones in '.env'
      // safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      // systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      // silent: true, // hide any errors
      // defaults: false // load '.env.defaults' as the default values if empty.
    }),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'src')+'/index.ejs',
      filename: path.resolve(__dirname, 'dist')+'/index.html',
      environment: {
        product: env.PRODUCT,
        stage: env.STAGE
      }
    }),
  ],
});