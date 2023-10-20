const path = require("path");
const pages = ["index", "school-page"];
const CopyPlugin = require("copy-webpack-plugin");
const NodemonPlugin = require("nodemon-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

const config = {
  mode: "development",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js|jsx|ts|tsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  plugins: [
    new NodemonPlugin({
      script: "server.js",
    }),
  ],
};

const configPublic = Object.assign({}, config, {
  name: "configPublic",
  entry: pages.reduce((config, page) => {
    config[page] = `./src/${page}.tsx`;
    return config;
  }, {}),
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
});

const configServer = Object.assign({}, config, {
  name: "configServer",
  target: "node",
  entry: "./api/server.jsx",
  output: {
    filename: "server.js",
    path: path.resolve(__dirname),
  },
  externals: [nodeExternals()],
});

module.exports = [configServer, configPublic];
