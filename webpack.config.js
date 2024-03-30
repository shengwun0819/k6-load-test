const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    load_test: './tests/load-test.test.js',
  },
  output: {
    path: path.resolve(__dirname, 'load_test'),
    filename: '[name].test.js',
    libraryTarget: 'commonjs',
  },
  module: {
    rules: [{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }],
  },
  stats: {
    colors: true,
    warnings: false,
  },
  target: 'node',
  externals: [/k6(\/.*)?/],
  devtool: 'source-map',
};
