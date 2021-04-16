/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require("path");
const CracoLessPlugin = require("craco-less");

const resolve = (url) => path.join(__dirname, url);
module.exports = {
  webpack: {
    alias: {
      "@": resolve("./src"),
    },
    // configure: (webpackConfig, { env, paths }) => {
    //   console.log(webpackConfig);
    //   return webpackConfig;
    // },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      // options: {
      //   lessLoaderOptions: {
      //     lessOptions: {
      //       javascriptEnabled: true,
      //     },
      //   },
      // },
    },
  ],
};
