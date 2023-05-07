const path = require("path");
const pages = ["index", "school-page"];

module.exports = {
  entry: pages.reduce((config, page) => {
    config[page] = `./src/scripts/${page}.ts`;
    return config;
  }, {}),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
