const reqSvgs = require.context("./svg", false, /\.svg$/);
const requireAll = (requireContext: __WebpackModuleApi.RequireContext) =>
  requireContext.keys().map((value) => {
    return requireContext(value).default;
  });
//deving 无效
export const initSvgIcons = () => requireAll(reqSvgs);
