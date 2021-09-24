/**
 * 模拟加载时间
 * @time 默认2s
 */
export const sleep = (time = 2) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time * 1000);
  });
};
