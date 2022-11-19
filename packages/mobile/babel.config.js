module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        require.resolve("babel-plugin-module-resolver"),
        {
          root: ["./"],
          alias: {
            "@components": "./src/components",
            "@hocs": "./src/hocs",
            "@hooks": "./src/hooks",
            "@modules": "./src/modules/",
            "@routes": "./src/routes/",
            "@styles": "./src/styles",
            "@templates": "./src/templates",
            "@utils": "./src/utils",
          },
        },
      ],
    ],
  };
};
