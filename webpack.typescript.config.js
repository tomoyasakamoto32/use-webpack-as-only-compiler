const path = require('path');
const glob = require('glob');

const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: glob.sync('./src/static/ts/**/*.ts').reduce((files, filePath) => {
    const name = filePath.split(path.sep).filter((_, index) => index > 2).join(path.sep).replace(/\.[^]+$/, '');
    return { ...files, [name]: filePath };
  }, {}),
  output: {
    path: path.resolve(__dirname, 'src/static/js'),
    filename: '[name].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      }
    ]
  },
  resolve: {
    extensions: [
      '.ts'
    ],
    preferRelative: true,
  },
  optimization: {
    minimizer: [new TerserPlugin({
      extractComments: false,
    })],
  },
}