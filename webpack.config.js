const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'client', 'root.jsx'),
  module: {
    loaders: [
      {
        test: [/\.(js|jsx)$/],
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'builds')
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
