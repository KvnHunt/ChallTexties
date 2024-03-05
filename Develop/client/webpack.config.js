const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Generate HTML files with correct <script> and <link> tags for generated bundles
      new HtmlWebpackPlugin({
        template: './src/index.html',
        chunks: ['main'],
        filename: 'index.html'
      }),
      // Generate a web app manifest file for Progressive Web Apps (PWA)
      new WebpackPwaManifest({
        name: 'Your App Name',
        short_name: 'App Name',
        description: 'Description of your app',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: path.resolve('src/assets/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512]
          }
        ]
      }),
      // Configure Workbox to inject a service worker into your webpack build
      new InjectManifest({
        swSrc: './src/sw.js', // Path to your service worker file
        swDest: 'sw.js', // Output path for the service worker file
      })
    ],
    module: {
      rules: [
        // CSS loader to handle CSS files
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        // Babel loader to transpile JavaScript files
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ],
    },
  };
};
