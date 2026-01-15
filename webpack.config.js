const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Додаємо цей рядок

module.exports = {
  mode: 'production', // Змініть на production для деплою

  entry: {
    main: './src/js/main.js',
    main_css: './src/css/main.css',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    clean: true,
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
    ],
  },

  plugins: [
    new RemoveEmptyScriptsPlugin(),
    new MiniCssExtractPlugin({
      filename: (pathData) => {
        return pathData.chunk.name === 'main_css' ? 'css/main.css' : 'js/[name].js';
      },
    }),
    // Новий плагін тут:
    new HtmlWebpackPlugin({
      template: './single-post.html', // шлях до вашого файлу в корені
      filename: 'index.html',         // назва у папці dist для Vercel
      inject: 'body',                 // автоматично вставить <script> та <link>
    }),
  ],
};