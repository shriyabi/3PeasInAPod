// metro.config.js
const { getDefaultConfig } = require("metro-config");

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig.getDefaultValues(
    "metro"
  );

  return {
    /*transformer: {
      babelTransformerPath: require.resolve("nativewind/babelTransform"),
    },*/
    resolver: {
      assetExts: assetExts.filter((ext) => ext !== "svg"),
      sourceExts: [...sourceExts, "cjs", "svg"], // Add any other extensions you need here
    },
  };
})();
