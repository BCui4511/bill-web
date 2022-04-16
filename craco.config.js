/* craco.config.js */
/* 文档：https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md#installation */

const CracoLessPlugin = require('craco-less');
const CracoAlias = require('craco-alias');

const { getPluginsConfig, getOptimizationConfig } = require('./webpackConfig/index');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        modifyLessRule(lessRule, _context) {
          lessRule.test = /\.less$/;
          // lessRule.use = handlePostCssLoader(lessRule.use);
          return lessRule;
        },
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {},
            javascriptEnabled: true
          }
        }
      }
    },
    {
      plugin: CracoAlias,
      options: {
        unsafeAllowModulesOutsideOfSrc: true,
        aliases: {
          '@/components': './src/components',
          '@/modules': './src/modules',
          '@/utils': './src/utils'
        }
      }
    }
  ],
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.plugins = getPluginsConfig(webpackConfig.plugins, env);
      webpackConfig.optimization = getOptimizationConfig(webpackConfig.optimization, env);
      // webpackConfig.module = getMoudleConfig(webpackConfig.module, env);
      // webpackConfig.externals = {
      //   react: 'React',
      //   'react-dom': 'ReactDOM'
      // };
      // if (env !== 'development') {
      //   webpackConfig.output.path = `${webpackConfig.output.path}/${childAppName}`;
      //   paths.appBuild = webpackConfig.output.path;
      // }
      return webpackConfig;
    }
  },
  babel: {
    plugins: [['@babel/plugin-transform-modules-commonjs']]
  },
  devServer: {
    port: 3000,
    proxy: {}
  }
};
