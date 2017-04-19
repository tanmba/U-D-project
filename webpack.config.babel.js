var webpack = require('webpack');
var { resolve } = require( "path" );


module.exports = () => 
{
return {
  context: resolve('js'),
  entry: './App.js',
  output: 
  {
    path: resolve('dist'),
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  devtool: 'source-map',
  module:
  {
    loaders: 
    [
      { 
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ['es2015']
        }
       }
    ],
  },
    devServer: {
    contentBase: resolve('./'),
    compress: true,
    port: 8080,
    host: "10.30.3.254", // specify your personal ip adress
  }
  }
};