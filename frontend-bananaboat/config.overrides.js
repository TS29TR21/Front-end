// config-overrides.js
module.exports = function override(config, env) {
  // Example: Add a new loader
  config.module.rules.push({
    test: /\.txt$/,
    use: "raw-loader",
  });

  return config;
};
