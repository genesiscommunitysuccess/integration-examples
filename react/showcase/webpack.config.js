const path = require('path');
const { config } = require('dotenv');
const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Import the plugin
const { resolveDefineConfig } = require('@genesislcap/build-kit');

config(); // Load .env variables

module.exports = {
  entry: './src/index.tsx', // Adjust based on your entry point
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[contenthash].js',
  },
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: ['file-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      'foundationZero/ZeroDesignSystem': path.resolve(
        __dirname,
        'node_modules/@genesislcap/foundation-zero'
      ),
    },
  },
  plugins: [
    new DefinePlugin(resolveDefineConfig(['GENX_*', 'FOUNDATION_AUTH'])),
    new HtmlWebpackPlugin({
      template: './public/index.html', // Path to your HTML template
      inject: true, // This ensures the JS files are injected into the HTML
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, 'public'), // Serve static files
    compress: true,
    port: 3000,
    historyApiFallback: true, // Handle React Router
  },
  ignoreWarnings: [
    /Failed to parse source map/, // Add other warnings to ignore if needed
  ],
};