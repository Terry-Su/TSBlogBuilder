import * as PATH from "path"
import { __DEV__ } from "../global"
const CopyWebpackPlugin = require( "copy-webpack-plugin" )
const HtmlWebpackPlugin = require( "html-webpack-plugin" )
const CleanWebpackPlugin = require( "clean-webpack-plugin" )
const BundleAnalyzerPlugin = require( "webpack-bundle-analyzer" )
  .BundleAnalyzerPlugin

const srcDirectory = PATH.resolve( __dirname, "../../src" )
const buildDirectory = PATH.resolve( __dirname, "../../build" )

const webpack = require( "webpack" )

module.exports = {
  mode: __DEV__ ? 'development': 'production',
  entry: {
    "scripts/nav.bundle.js": [
      PATH.resolve( srcDirectory, "nav/entry.tsx" )
    ].concat(
      __DEV__ ?
        [ "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000" ] :
        []
    ),
    "scripts/detail.bundle.js": [
      PATH.resolve( srcDirectory, "detail/entry.tsx" )
    ].concat(
      __DEV__ ?
        [ "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000" ] :
        []
    )
  },
  output: {
    path      : buildDirectory,
    filename  : "[name]",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test   : /\.ts*?/,
        use    : "ts-loader",
        // include: __dirname
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use : [ "style-loader", "css-loader" ]
      },
      {
        test: /\.scss$/,
        use : [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS
        ]
      },
      {
        test  : /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader?limit=100000000"
      }
    ]
  },
  resolve: {
    extensions: [ ".ts", ".tsx", ".js" ]
  },
  devtool: __DEV__ ? "source-map" : false,
  plugins: [].concat(
    __DEV__ ?
      [ new webpack.HotModuleReplacementPlugin() ] :
      [ new CleanWebpackPlugin( [ "build" ] ), new BundleAnalyzerPlugin() ]
  )
}