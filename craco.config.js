/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { when, whenDev, whenProd, whenTest, ESLINT_MODES, POSTCSS_MODES } = require("@craco/craco");
const CracoLessPlugin = require("craco-less");
const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");
let isProd = process.env.NODE_ENV === "production";

//https://www.npmjs.com/package/@craco/craco
module.exports = {
  reactScriptsVersion: "react-scripts" /* (default value) */,
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    plugins: {
      add: [] /* An array of plugins */,
      remove: [] /* An array of plugin constructor's names (i.e. "StyleLintPlugin", "ESLintWebpackPlugin" ) */,
    },
    configure: (webpackConfig, { env, paths }) => {
      /**分析包大小 */
      if (process.env.ANALYZE == "true") {
        //https://www.npmjs.com/package/webpack-bundle-analyzer
        webpackConfig.plugins.push(new BundleAnalyzerPlugin());
      }
      //https://ant.design/docs/react/replace-moment-cn
      /** 等用了moment 时再做个比较 */
      // if (isProd) {
      //   webpackConfig.plugins.push(new AntdDayjsWebpackPlugin());
      // }
      return webpackConfig;
    },
  },

  // devServer: {
  //   /* Any devServer configuration options: https://webpack.js.org/configuration/dev-server/#devserver. */
  // },
  devServer: (devServerConfig, { env, paths, proxy, allowedHost }) => {
    return devServerConfig;
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // modifyVars: { "@primary-color": "#1DA57A" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
