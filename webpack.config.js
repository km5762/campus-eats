const path = require("path");
const pages = ["index", "school-page"];
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
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
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "./public/images",
          to: "./images",
          noErrorOnMissing: true,
        },
        {
          from: "./public/styles",
          to: "./styles",
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
