import Mock from "mockjs";
import { resFn } from "./utils";
//参考 https://github.com/PanJiaChen/vue-element-admin/blob/master/mock/article.js
const baseContent =
  '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>';
const image_uri = "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3";
const list: ArticleItem[] = Array(100)
  .fill(1)
  .map(() => {
    return Mock.mock({
      id: "@increment",
      timestamp: +Mock.Random.date("T"),
      author: "@first",
      reviewer: "@first",
      title: "@title(5, 10)",
      content_short: "mock data",
      content: baseContent,
      forecast: "@float(0, 100, 2, 2)",
      importance: "@integer(1, 3)",
      "type|1": ["CN", "US", "JP", "EU"],
      "status|1": ["published", "draft"],
      display_time: "@datetime",
      comment_disabled: true,
      pageviews: "@integer(300, 5000)",
      image_uri,
      platforms: ["a-platform"],
    });
  });

export const getList = (req: any) => {
  const reqBody: ReqDataArticleList = JSON.parse(req.body);
  reqBody.current = Number(reqBody.current);
  reqBody.pageSize = Number(reqBody.pageSize);
  const _start = (reqBody.current - 1) * reqBody.pageSize;
  const _end = _start + reqBody.pageSize;
  const _list = list.slice(_start, _end);
  return resFn<ResDataArticleList>({ list: _list, total: list.length });
};
