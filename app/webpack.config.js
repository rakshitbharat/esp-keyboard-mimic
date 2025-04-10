const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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

const preload = {
  ...common,
  target: 'electron-preload',
  entry: './src/preload.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'preload.js'
  }
};

const renderer = {
  ...common,
  target: 'electron-renderer',
  entry: './src/renderer.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'renderer.js',
    publicPath: isDevelopment ? '/' : './'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
      filename: 'index.html'
    })
  ],
  devServer: isDevelopment ? {
    hot: true,
    port: 8080,
    static: {
      directory: path.join(__dirname),
      publicPath: '/'
    }
  } : undefined
};

module.exports = [main, preload, renderer];
