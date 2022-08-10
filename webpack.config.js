const path = require("path");

const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const isProduction = process.env.NODE_ENV === "production";
const HtmlWebpackPlugin = require("html-webpack-plugin");

const stylesHandler = "style-loader";

const pages = [
  "index",
  "my-reports",
  "team-reports",
  "aside-bar",
  "fill-out-report",
  "sign-in",
  "edit-profile",
  "edit-member-info"
];


const config = {
  entry: "./src/index.js",
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: '[name][ext]',
  },

  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },

  devServer: {
    open: true,
    host: "localhost",
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html"
    }),
    new HtmlWebpackPlugin({
      template: "./my-reports.html",
      filename: "my-reports.html"
    }),
    new HtmlWebpackPlugin({
      template: "./fill-out-report.html",
      filename: "fill-out-report.html"
    }),
    new HtmlWebpackPlugin({
      template: "./invite-your-team.html",
      filename: "invite-your-team.html"
    }),
    new HtmlWebpackPlugin({
      template: "./team-reports.html",
      filename: "team-reports.html"
    }),
    new HtmlWebpackPlugin({
      template: "./my-company.html",
      filename: "my-company.html"
    }),
    new HtmlWebpackPlugin({
      template: "./sign-in.html",
      filename: "sign-in.html"
    }),
    new HtmlWebpackPlugin({
      template: "./edit-profile.html",
      filename: "./edit-profile"
    }),
    new HtmlWebpackPlugin({
      template: "./edit-member-info.html",
      filename: "edit-member-info.html"
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.(png|svg|gif|woff|woff2|eot|jpg|ttf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
  } else {
    config.mode = "development";
  }

  return config;
};











/*entry: pages.reduce((config, page) => {
    config[page] = `./src/${page}.js`;
    return config;
  }, {}),*/