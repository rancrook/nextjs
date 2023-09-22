const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = {
  webpack(config, options) {
    const { isServer } = options;

    config.plugins.push(
      new NextFederationPlugin({
        name: 'ranjs',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './ToDo': './components/ToDo.js'
        }
      })
    );

    return config;
  },
};
