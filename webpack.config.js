const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.js$/, 
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/, // CSS
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/, 
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/, 
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/public/index.html", 
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/public/app.webmanifest", to: "app.webmanifest" }, 
        { from: "src/public/sw.js", to: "sw.js" },
        { from: "src/public/images", to: "images" },
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    compress: true,
    port: 7000,
    hot: true,
    historyApiFallback: true,
  },
};
