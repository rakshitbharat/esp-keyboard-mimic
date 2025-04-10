const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/main.ts',
  target: 'electron-main',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: 'ts-loader'
    }]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  node: {
    __dirname: false
  }
};
