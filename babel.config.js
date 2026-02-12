module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      // Add any Babel plugins here if needed
      // 'react-native-worklets/plugin',
      'react-native-reanimated/plugin',
    ],
  };
};