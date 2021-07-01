const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const generalConfig = {
  watchOptions: {
    aggregateTimeout: 600,
    ignored: /node_modules/,
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, './dist')],
    }),
  ],
  module: {
    rules: [
      {
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: ['.js'],
  },
};

const nodeConfig = {
  entry: './src/node-index.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'node.js',
    libraryTarget: 'umd',
    libraryExport: 'default',
    globalObject: 'this',
  },
};

// const browserConfig = {
//   entry: './src/browser-index.js',
//   externalsType: 'import',
//   externals: {
//     axios: 'axios',
//   },
//   target: 'es6',
//   output: {
//     path: path.resolve(__dirname, './dist'),
//     filename: 'browser.js',
//     libraryExport: 'default',
//     environment: { 
//       module: true,
//       dynamicImport: true,
//     },
//   },
//   experiments: {
//     outputModule: true
//   }
// };

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    generalConfig.devtool = 'cheap-module-source-map';
  } else if (argv.mode === 'production') {
  } else {
    throw new Error('Specify env');
  }

  Object.assign(nodeConfig, generalConfig);
  // Object.assign(browserConfig, generalConfig);
  return [nodeConfig, browserConfig];
};
