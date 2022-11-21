/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
// plugins
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const common = require('./webpack.common');

const config = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    port: 3000,
    open: true,
    historyApiFallback: true,
    static: false,
    headers: { 'Access-Control-Allow-Origin': '*' },
    client: { overlay: false },
  },
  output: { pathinfo: false },
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  plugins: [
    new ESLintPlugin({
      emitError: true, // show errors after compile
      emitWarning: true,
      threads: true,
      extensions: ['js', 'jsx'],
    }),
    new ReactRefreshWebpackPlugin(),
  ],
};

module.exports = merge(common, config);
