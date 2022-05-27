const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'production',
  externals: {
    // 拒绝jQuery被打包进来.
    // 实际应用：比如jQuery库我们觉得比较大，不想打包到我们的文件，而是直接在index.html中以CDN的形式引入。
    jquery: 'jQuery'
  }
};
