const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin'); // Use instead of importing images in code

module.exports = {
  mode: 'development',

  entry: {
    main: './src/js/main.js',       // JS entry
    main_css: './src/css/main.css', // CSS entry
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    clean: true, // THIS REPLACES clean-webpack-plugin. Webpack cleans the dist folder itself.
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]'
        }
      },
    ],
  },

  plugins: [
    new RemoveEmptyScriptsPlugin(),
    new MiniCssExtractPlugin({
      filename: (pathData) => {
        return pathData.chunk.name === 'main_css' ? 'css/main.css' : 'js/[name].js';
      },
    }),
    new HtmlWebpackPlugin({
      template: './single-post.html',
      filename: 'index.html',
      inject: 'body',
    }),
    // THIS PLUG-IN COPIES YOUR IMAGES
    new CopyPlugin({
      patterns: [
        { 
          from: path.resolve(__dirname, 'src/images'), 
          to: path.resolve(__dirname, 'dist/images'),
          noErrorOnMissing: true 
        },
      ],
    }),
  ],
};