const path = require('path');
const isDevelopment = process.env.NODE_ENV === 'development';

const common = {
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'source-map' : false,
  module: {
    rules: [{
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: 'ts-loader'
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader']
    }]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
};

const main = {
  ...common,
  target: 'electron-main',
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  }
};

const renderer = {
  ...common,
  target: 'electron-renderer',
  entry: './src/renderer.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'renderer.js'
  },
  devServer: isDevelopment ? {
    hot: true,
    port: 8080,
    static: {
      directory: path.join(__dirname, 'dist'),
      publicPath: '/'
    }
  } : undefined
};

module.exports = [main, renderer];
