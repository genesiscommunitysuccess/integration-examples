const path = require('path');
const { resolveDefineConfig } = require('@genesislcap/build-kit');
const { config } = require('dotenv');
const { DefinePlugin } = require('webpack');

config();

module.exports = {
  plugins: [new DefinePlugin(resolveDefineConfig(['GENX_*']))],
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
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {},
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      'foundationZero/ZeroDesignSystem': path.resolve(
        __dirname,
        'node_modules/@genesislcap/foundation-zero',
      ),
    },
  },
};
