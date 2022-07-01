const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    index: [
      path.resolve(__dirname, 'src/index.js')
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: 'vella-pay',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  devtool: 'source-map',
	optimization: {
		minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        output: { comments: false }
      }
    })],
  }
};

