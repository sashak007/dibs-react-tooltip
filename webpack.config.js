'use strict';

var path = require('path');
var autoprefixer = require('autoprefixer');

module.exports = {
    entry: './Tooltip.jsx',
    output: {
        libraryTarget: 'umd',
        path: path.resolve(__dirname, './dist'),
        filename: 'Tooltip.js'
    },
    externals: [
        'react',
        'classnames'
    ],
    module: {
        loaders: [
            {test: /\.jsx$/, loader: 'babel-loader', query: {presets: ['es2015', 'react']}},
            {test: /\.css$/, loader: 'style!css?localIdentName=[name]__[local]___[hash:base64:5]!postcss'}
        ]
    },
    postcss: [
        autoprefixer({autoprefixer: undefined})
    ],
    devtool: 'source-map'
};
