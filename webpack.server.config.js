const fs = require('fs');
const path = require('path');

module.exports = {

  entry: path.resolve(__dirname, 'app', 'server.js'),

  output: {
    filename: 'server.bundle.js',
    path: path.resolve(__dirname, 'app'),
  },

  target: 'node',

  externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
    'react-dom/server', 'react/addons',
  ]).reduce((ext, mod) => {
    ext[mod] = `commonjs ${mod}`;
    return ext;
  }, {}),

  node: {
    __filename: true,
    __dirname: true,
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['latest', 'stage-0', 'react'],
        },
      },
    ],
  },
};
