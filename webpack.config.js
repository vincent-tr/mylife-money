const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'public');
const APP_DIR   = path.resolve(__dirname, 'public/app');

const config = {
  entry: APP_DIR + '/main.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel'
      }
    ]
  },
  devtool: 'eval'
};

module.exports = config;