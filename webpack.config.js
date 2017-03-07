var path = require('path');

module.exports = {
    entry: './client.jsx',

    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/'
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['latest', 'stage-0', 'react']
                }
            }
        ]
    }
};