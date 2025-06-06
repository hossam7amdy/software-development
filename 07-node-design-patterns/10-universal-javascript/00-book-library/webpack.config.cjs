// Generated using webpack-cli https://github.com/webpack/webpack-cli

const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

const config = {
  entry: './src/frontend/index.js',
  output: {
    path: resolve(__dirname, 'public')
  },
  devServer: {
    open: true,
    host: 'localhost'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/frontend/index.html'
    })

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset'
      },

      {
        test: /\.html$/i,
        use: ['html-loader']
      }

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ]
  }
}

module.exports = () => {
  if (isProduction) {
    config.mode = 'production'

    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW())
  } else {
    config.mode = 'development'
  }
  return config
}
