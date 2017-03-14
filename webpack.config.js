/* eslint max-len: 0 */
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './client.jsx',

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/',
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['latest', 'stage-0', 'react'],
        },
      }, {
        test: /\.css$/,
        include: path.resolve(__dirname),
        loaders: [
          'style-loader',
          'css-loader?importLoader=1&modules=true&localIdentName=[path]__[name]__[local]__[hash:base64:5]',
        ],
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin('styles.css'),
  ],
};
