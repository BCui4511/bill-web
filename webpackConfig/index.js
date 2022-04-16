const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const ENV_MAP = {
  development: 'development',
  production: 'production',
  test: 'test'
};

function getPluginsConfig(inputPlugins, _env) {
  const isDev = [ENV_MAP.development, ENV_MAP.test].indexOf(process.env.NODE_ENV) > -1;
  let pluginIndex = 0;
  inputPlugins.forEach((plugin, index) => {
    // HtmlWebpackPlugin
    if (plugin.constructor.name === 'HtmlWebpackPlugin') {
      plugin.options.templateParameters = { isDev };
      plugin.options.hash = true;
      plugin.options.inject = 'body';
      pluginIndex = index;
    }
  });

  const result = [new webpack.ProgressPlugin(), ...inputPlugins];
  return result;
}

function getOptimizationConfig(inputOptimization) {
  inputOptimization.usedExports = true;
  const isPro = process.env.NODE_ENV === ENV_MAP.production;
  // 生产模式开启压缩
  if (isPro) {
    inputOptimization.minimize = true;
    inputOptimization.minimizer = [...inputOptimization.minimizer, new UglifyJsPlugin()];
  }
  return inputOptimization;
}

module.exports = {
  getPluginsConfig,
  getOptimizationConfig
};
