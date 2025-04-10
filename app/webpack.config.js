const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonConfig = {
  mode: process.env.NODE_ENV || 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};

const mainConfig = {
  ...commonConfig,
  target: 'electron-main',
  entry: './src/main/index.ts',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js',
  },
};

const preloadConfig = {
  ...commonConfig,
  target: 'electron-preload',
  entry: './src/preload.ts',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'preload.js',
  },
};

const rendererConfig = {
  ...commonConfig,
  target: 'web',
  entry: './src/renderer.tsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'renderer.js',
    publicPath: process.env.NODE_ENV === 'development' ? '/' : './',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
      baseHref: './'
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'src'),
    },
    port: 8080,
    hot: true,
    liveReload: true,
    historyApiFallback: true,
    compress: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    devMiddleware: {
      publicPath: '/',
      writeToDisk: false,
    },
    watchFiles: {
      paths: ['src/**/*.*'],
      options: {
        usePolling: true,
      },
    },
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false
  }
};

module.exports = process.env.NODE_ENV === 'development' 
  ? [mainConfig, preloadConfig, rendererConfig] 
  : [mainConfig, preloadConfig, rendererConfig];
