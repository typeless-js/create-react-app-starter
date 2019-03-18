const path = require('path');

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: { src: path.resolve(__dirname, 'src') },
  };

  config.plugins = config.plugins.filter(plugin => {
    return plugin.constructor.name !== 'ForkTsCheckerWebpackPlugin';
  });

  return config;
};
