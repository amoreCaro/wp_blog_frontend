const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  
  entry: {
    main: './src/js/main.js',
    main_css: './src/css/main.css',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    clean: true,
    assetModuleFilename: 'images/[name][ext]', 
  },

  module: {
    rules: [
      // css rules 
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      // images rules
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
    ],
  },

  plugins: [
    // removes empty JS files from CSS-only entries
  new RemoveEmptyScriptsPlugin(), 

  new MiniCssExtractPlugin({
    filename: (pathData) => {
      // outputs CSS as dist/css/main.css
      return pathData.chunk.name === 'main_css'
        ? 'css/main.css'
        : 'js/[name].js';
    },
  }),
    // take single-post.html and rename it to index.html in dist folder
    new HtmlWebpackPlugin({
      template: './single-post.html',
      filename: 'index.html',
      inject: 'body',
    }),
  ],
};