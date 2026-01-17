// Node.js модуль для роботи з шляхами
const path = require('path');

// Витягує CSS з JS у окремі файли
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Видаляє "порожні" JS файли, які можуть створюватися при збірці CSS
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

// Генерує HTML файл і автоматично підключає туди JS та CSS
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Копіює файли (наприклад, зображення) з src до dist без імпорту в коді
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  // Режим розробки (development) – включає карти сорсів і швидку збірку
  mode: 'development',

  // Точки входу для JS і CSS
  entry: {
    main: './src/js/main.js',       // Основний JS
    main_css: './src/css/main.css', // Основний CSS
  },

  // Вихідні файли
  output: {
    path: path.resolve(__dirname, 'dist'), // Куди збирати файли
    filename: 'js/[name].js',              // Імена JS файлів
    clean: true, // Видаляє старі файли у dist перед новою збіркою
  },

  // Правила для обробки різних типів файлів
  module: {
    rules: [
      {
        test: /\.css$/, // Обробка CSS файлів
        use: [
          MiniCssExtractPlugin.loader, // Витягує CSS у окремий файл
          'css-loader',                // Інтерпретує @import і url() у CSS
          'postcss-loader',            // Додає autoprefixer і інші PostCSS плагіни
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // Обробка зображень
        type: 'asset/resource',              // Викидає файли у dist
        generator: {
          filename: 'images/[name][ext]'     // Де зберігати імена файлів у dist
        }
      },
    ],
  },

  plugins: [
    new RemoveEmptyScriptsPlugin(), // Видаляє порожні JS, якщо ми збираємо лише CSS
    new MiniCssExtractPlugin({
      filename: (pathData) => {
        // Якщо збирається main_css – записати у css/main.css
        // Для всіх інших – у js/[name].js
        return pathData.chunk.name === 'main_css' ? 'css/main.css' : 'js/[name].js';
      },
    }),
    new HtmlWebpackPlugin({
      template: './single-post.html', // Шаблон HTML
      filename: 'index.html',          // Вихідний HTML файл
      inject: 'body',                  // JS вставляється перед закриваючим </body>
    }),
    // Копіює всі зображення з src/images у dist/images
    new CopyPlugin({
      patterns: [
        { 
          from: path.resolve(__dirname, 'src/images'), 
          to: path.resolve(__dirname, 'dist/images'),
          noErrorOnMissing: true // Не видає помилку, якщо папка пуста
        },
      ],
    }),
  ],
};
