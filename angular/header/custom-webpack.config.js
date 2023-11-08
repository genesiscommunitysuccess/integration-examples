const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: path.resolve(__dirname, 'node_modules/@genesislcap/foundation-header'),
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
            },
          },
        ],
      }
    ],
  },
  resolve: {
    alias: {
      'foundationZero/ZeroDesignSystem': path.resolve(__dirname, 'node_modules/@genesislcap/foundation-zero')
    }
  }
};