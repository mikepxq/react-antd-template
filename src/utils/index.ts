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

/**
 * 去除模板字符串第一个换行
 * @param str
 * @returns
 */
export const removeFirstLineOfTemplateString = (str: string) => str.replace(/\n/, "");

/**
 * 获得序列号
 * @param page
 * @param index
 */
export const getTableSN = (page: ReqPageData, index: number) =>
  (Number(page.current) - 1) * Number(page.pageSize) + index + 1;
/**
 * 获得key列表  map中值为真
 * @param map
 * @returns
 */
export const getKeyListValueTrueInMap = (map: Record<string, boolean>): string[] =>
  Object.entries(map)
    .filter(([, v]) => v)
    .map(([key]) => key);
