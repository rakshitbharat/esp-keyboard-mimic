const path = require('path');
const isDevelopment = process.env.NODE_ENV === 'development';

const common = {
  mode: process.env.NODE_ENV || 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
};

const main = {
  ...common,
  target: 'electron-main',
  entry: './src/main.ts',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};

const renderer = {
  ...common,
  target: 'electron-renderer',
  entry: './src/renderer.tsx',
  output: {
    filename: 'renderer.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: isDevelopment ? 'http://localhost:8080/' : './'
  },
  devServer: isDevelopment ? {
    port: 8080,
    hot: true,
    compress: true,
    static: {
      directory: path.join(__dirname, 'public'),
      publicPath: '/'
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  } : undefined
};

module.exports = [main, renderer];
