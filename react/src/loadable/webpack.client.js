const path = require('path')
const nodeExternals = require('webpack-node-externals')
const LoadablePlugin = require('@loadable/webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const DIST_PATH = path.resolve(__dirname, '../../build')
const production = process.env.NODE_ENV === 'production'
const development = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

const getConfig = target => ({
  name: target,
  mode: development ? 'development' : 'production',
  target,
  entry: `./src/loadable/main-${target}.tsx`,
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  module: {
    rules: [{
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            caller: {
              target,
            },
            configFile: path.resolve(__dirname, 'babel.config.js'),
          },
        },
      },
      {
        test: /\.(ttf|eot|woff2?)$/,
        loader: 'file-loader',
      },
      {
        test: /\.css$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  externals: target === 'node' ? ['@loadable/component', nodeExternals()] : undefined,
  output: {
    path: path.join(DIST_PATH, target),
    filename: production ? '[name]-bundle-[chunkhash:8].js' : '[name].js',
    publicPath: `/${target}/`,
    libraryTarget: target === 'node' ? 'commonjs2' : undefined,
  },
  plugins: [
    new LoadablePlugin(),
    new MiniCssExtractPlugin({
      filename: development ? '[name].css' : '[name].[hash].css',
      chunkFilename: development ? '[id].css' : '[id].[hash].css',
    }),
  ],
})

module.exports = [getConfig('web'), getConfig('node')]