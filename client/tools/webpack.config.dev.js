var path = require("path");
var webpack = require("webpack");
var common = require("./webpack.config.common");
const MonacoWebpackPlugin = require('../node_modules/monaco-editor-webpack-plugin');

console.log("Bundling for development...");

module.exports = {
  devtool: "source-map",
  entry: common.config.entry,
  mode: "development",
  node: {
    fs: 'empty'
  },
  output: {
    filename: '[name].js',
    path: common.config.buildDir,
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  devServer: {
    contentBase: common.config.publicDir,
    publicPath: '/',
    host: '0.0.0.0',
    port: 8080,
    hot: true,
    inline: true,
    // proxy
  },
  module: {
    rules: common.getModuleRules()
  },
  plugins: common.getPlugins().concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new MonacoWebpackPlugin(),
      new webpack.ContextReplacementPlugin(
        /monaco-editor(\\|\/)esm(\\|\/)vs(\\|\/)editor(\\|\/)common(\\|\/)services/,
        __dirname
      ),
      new webpack.DefinePlugin({
        PYTHONSERVICE_URI: JSON.stringify(typeof(process.env.PYTHONSERVICE_URI)=="undefined"?"http://localhost:7101":process.env.PYTHONSERVICE_URI),
        RSERVICE_URI: JSON.stringify(typeof(process.env.RSERVICE_URI)=="undefined"?"http://localhost:7103":process.env.RSERVICE_URI),
        DATASTORE_URI: JSON.stringify(typeof(process.env.DATASTORE_URI)=="undefined"?"http://localhost:7102":process.env.DATASTORE_URI)
    })
  ]),
  resolve: {
    modules: [common.config.nodeModulesDir],
    extensions: [".ts", ".tsx", ".js", ".fs"]
  },
};
