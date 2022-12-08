/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT_PATH = path.resolve(process.cwd());

const config = {
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      containers: path.resolve(ROOT_PATH, './src/containers'),
      components: path.resolve(ROOT_PATH, './src/components'),
      routes: path.resolve(ROOT_PATH, './src/routes'),
      links: path.resolve(ROOT_PATH, './src/links'),
      menus: path.resolve(ROOT_PATH, './src/menus'),
      utils: path.resolve(ROOT_PATH, './src/utils'),
      formComponentTypes: path.resolve(ROOT_PATH, './src/formComponentTypes'),
      fire: path.resolve(ROOT_PATH, './src/firebase'),
      errorMessages: path.resolve(ROOT_PATH, './src/errorMessages'),
      admins: path.resolve(ROOT_PATH, './src/adminsUID'),
    },
  },
  entry: {
    bundle: [
      './src/index',
    ],
  },
  output: {
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    // new webpack.ProvidePlugin({ process: 'process/browser' }),
    new HtmlWebpackPlugin({ template: path.resolve(ROOT_PATH, './public/index.html') }),
    new webpack.ProvidePlugin({ Buffer: ['buffer', 'Buffer'] }),
    new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
  ],
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: path.resolve(ROOT_PATH, 'node_modules'),
      // options: { transpileOnly: true },
      loader: 'babel-loader',
    }, {
      test: /(\.css|\.scss)$/,
      use: [
        'style-loader',
        'css-loader',
      ],
    }, {
      test: /\.less$/,
      use: [
        'style-loader',
        'css-loader', // translates CSS into CommonJS
        {
          loader: 'less-loader', // compiles Less to CSS
          options: {
            lessOptions: {
              modifyVars: {
              //   'primary-color': '#FF9F43',
              //   'link-color': '#FF9F43',
                'border-radius-base': '8px',
              //   'disabled-color': 'rgba(0, 0, 0, 0.6)',
              //   '@menu-item-color': '#DADADA',
              },
              javascriptEnabled: true,
            },
          },
        },
      ],
    }],
  },
};

module.exports = config;
