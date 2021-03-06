var helpers = require('../../../helpers');
const commonConfig = require('../common.js');

const webpackMerge = require('webpack-merge');

/* plugins */
var DefinePlugin = require('webpack/lib/DefinePlugin');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
var DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
var OccurrenceOrderPlugin = require('webpack/lib/optimize/OccurrenceOrderPlugin');

var ENV = process.env.ENV = process.env.NODE_ENV = 'production';

const METADATA = webpackMerge(commonConfig.metadata, {ENV: ENV});

module.exports = webpackMerge(commonConfig, {
  metadata: METADATA,
  debug: false,
  target: 'node',

  entry: {
    'static-server': helpers.root('src/server/static/server.ts'),
    'match-server': helpers.root('src/server/match/server.ts'),
  },

  output: {path: helpers.root('build/dist/server'), filename: '[name].js'},

  module: {
    loaders:
        [{test: /\.ts$/, loader: 'awesome-typescript-loader', exclude: [/\.(spec|e2e)\.ts$/]}]
  },

  plugins: [
    new ForkCheckerPlugin(), new DedupePlugin(), new OccurrenceOrderPlugin(true),
    new DefinePlugin({'ENV': JSON.stringify(ENV)})
  ],

  node: {
    global: 'window',
    process: false,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
});
