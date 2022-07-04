const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let mode = "development";
if (process.env.NODE_ENV === "production") {
  mode = "production";
}

module.exports = {
  mode: mode,
  entry: {
    scripts: "./src/index.js",
  },
  output: {
    filename: mode === "production" ? "[name].[contenthash].js" : "[name].js",
    assetModuleFilename:
      mode === "production"
        ? "assets/[hash][ext][query]"
        : "assets/[name][ext][query]",
    publicPath: "/",
  },
  devServer: {
    open: true,
    hot: true,
    static: {
      directory: "./src",
      watch: true,
    },
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          mode === "production" ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: mode === "production" ? "styles.[hash].css" : "[name].css",
      chunkFilename: mode === "production" ? "[id].[hash].css" : "[id].css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};
