const MomentLocalePlugin = require('moment-locales-webpack-plugin');

module.exports = (config, options, targetOptions) => {
  config.plugins.push(
    new MomentLocalePlugin({
      localesToKeep: ['de'],
    })
  );

  return config;
};
