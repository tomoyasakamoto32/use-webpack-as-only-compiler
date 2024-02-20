const path = require('path');
const glob = require('glob');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");

const getEntryMap = (path) => glob.sync(path).reduce((files, path) => {
  const name = path.split('/').pop().replace(/\.[^]+$/, '');
  return { ...files, [name]: path };
}, {});

module.exports = {
  name: 'sass-compile',
  entry: getEntryMap('./src/static/sass/*.scss'),
  output: {
    path: path.resolve(__dirname, 'src/static/css'),
    filename: '[name].js',
    clean: true,
  },
  resolve: {
    preferRelative: true
  },
  plugins: [
    new RemoveEmptyScriptsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    })
  ],
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              sassOptions: {
                outputStyle: "compressed",
              },
            },
          },
        ]
      }
    ]
  },
}