const path = require("path");
const pages = ["index", "school-page"];
const CopyPlugin = require("copy-webpack-plugin");
const NodemonPlugin = require("nodemon-webpack-plugin");

module.exports = [
  {
    mode: "development",
    devtool: "source-map",
    entry: pages.reduce((config, page) => {
      config[page] = `./src/${page}.tsx`;
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
      extensions: [".tsx", ".ts", ".js", ".jsx"],
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
      new NodemonPlugin({
        script: "server.js",
      }),
    ],
  },
];
