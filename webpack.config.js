const path = require('path');
const JavaScriptObfuscator = require('webpack-obfuscator');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production', // Chế độ production tự động tối ưu hóa
  entry: './src/public/js/main.js', // File JS chính của bạn
  output: {
    path: path.resolve(__dirname, 'dist/public'),
    filename: 'js/bundle.js', // Gộp tất cả JS vào 1 file đã mã hóa
    clean: true, // Xóa folder cũ mỗi khi build lại
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(), // Nén ép JS
      new CssMinimizerPlugin(), // Nén ép CSS
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/style.css', // Xuất file CSS đã nén
    }),
    // Đây là "phù thủy" làm rối code JS của bạn
    new JavaScriptObfuscator({
      rotateStringArray: true,
      stringArrayThreshold: 0.75,
    }, [])
  ],
};