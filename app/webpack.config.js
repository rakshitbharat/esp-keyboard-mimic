const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDevelopment = process.env.NODE_ENV === 'development';

const common = {
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'source-map' : false,
  module: {
    rules: [{
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
            '@babel/preset-typescript'
          ]
        }
      }
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader']
    }]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  }
};

const main = {
  ...common,
  target: 'electron-main',
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  node: {
    __dirname: false
  }
};

const renderer = {
  ...common,
  target: 'web',
  entry: './src/renderer.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'renderer.js',
    publicPath: './'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
      filename: 'index.html',
      inject: true
    })
  ]
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

module.exports = isDevelopment ? [main, preload, renderer] : [main, preload, renderer];
