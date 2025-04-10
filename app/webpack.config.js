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

const rendererConfig = {
  ...commonConfig,
  target: 'web',
  entry: './src/renderer.tsx',
  output: {
    path: path.join(__dirname, 'dist/renderer'),
    filename: 'renderer.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist/renderer'),
    },
    port: 8080,
    hot: true,
  },
};

module.exports = [mainConfig, rendererConfig];
