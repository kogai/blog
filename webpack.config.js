const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const output = path.resolve(__dirname, "dist");

module.exports = {
  entry: "./src/app.js",
  module: {
    rules: []
  },
  devtool: "cheap-eval-source-map",
  plugins: [
    new HtmlWebpackPlugin({ title: "example", template: "./index.html" }),
    new CleanWebpackPlugin()
  ],
  resolve: {
    extensions: [".js"]
  },
  output: {
    filename: "[name].js",
    chunkFilename: "[name].js",
    path: output
  }
};
