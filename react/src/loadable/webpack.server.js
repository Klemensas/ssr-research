const path = require('path')
const nodeExternals = require('webpack-node-externals')

const DIST_PATH = path.resolve(__dirname, '../../build')
const development = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

module.exports = {
  name: 'node',
  mode: development ? 'development' : 'production',
  target: 'node',
  entry: `./src/loadable/server.tsx`,
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [{
        test: /server\.tsx$/,
        loader: 'string-replace-loader',
        options: {
          search: /build/g,
          replace: './build',
        },
      },
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            caller: {
              target: 'node',
            },
            configFile: path.resolve(__dirname, 'babel.config.js'),
          },
        },
      },
    ],
  },
  externals: ['@loadable/component', nodeExternals()],
  output: {
    path: DIST_PATH,
    filename: 'server.js',
    publicPath: `./`,
    libraryTarget: 'commonjs2',
  },
}