module.exports = function (config) {
  var testWebpackConfig = require('./config/webpack/client/test.js');

  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    exclude: [],
    files: [{ pattern: './config/spec-bundle.js', watched: false }],
    preprocessors: { './config/spec-bundle.js': ['coverage', 'webpack', 'sourcemap'] },
    webpack: testWebpackConfig,

    coverageReporter: {
      dir : 'coverage/',
      reporters: [
        { type: 'text-summary' },
        { type: 'json' },
        { type: 'html' },
        { type: 'lcovonly', subdir: 'lcov' }
      ]
    },
    webpackServer: { noInfo: true },
    reporters: [ 'mocha', 'coverage' ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: [
      'PhantomJS'
    ],
    singleRun: true
  });

};
