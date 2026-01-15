const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // додаємо плагін для HTML

module.exports = {
  mode: 'development',

  entry: {
    main: './src/js/main.js',       // JS entry
    main_css: './src/css/main.css', // CSS entry
  },

  output: {
    path: path.resolve(__dirname, 'dist'), // dist всередині assets/
    filename: 'js/[name].js',              // JS файли
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
        // CSS entry зберігаємо як main.css
        return pathData.chunk.name === 'main_css' ? 'css/main.css' : 'js/[name].js';
      },
    }),
    new HtmlWebpackPlugin({
      template: './src/single-post.html', // твій шаблон HTML
      filename: 'index.html',       // файл який буде згенерований у dist
      inject: 'body',               // вставляє всі скрипти перед закриваючим </body>
    }),
  ],
};
