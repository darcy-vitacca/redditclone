//tells webpack to find any svg to load and find it inside of js/ts
module.exports = {
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        issuer: {
          test: /\.(js|ts)x?$/,
        },
        use: ['@svgr/webpack'],
      });
  
      return config;
    },
    images: {
      domains: ['www.gravatar.com', 'localhost']
    }
  };