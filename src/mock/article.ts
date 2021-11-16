import Mock from "mockjs";
import { resFn } from "./utils";
//参考 https://github.com/PanJiaChen/vue-element-admin/blob/master/mock/article.js
const baseContent =
  '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>';
// const image_uri = "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3";
let listIndex = 3;
let list: ArticleItem[] = Array(2)
  .fill(1)
  .map(() => {
    return Mock.mock({
      id: "@increment",
      timestamp: +Mock.Random.date("T"),
      author: "@first",
      // reviewer: "@first",
      title: "@title(5, 10)",
      // content_short: "mock data",
      content: baseContent,
      // forecast: "@float(0, 100, 2, 2)",
      hot: "@integer(0, 5)",
      // "type|1": ["CN", "US", "JP", "EU"],
      // "status|1": ["published", "draft"],
      dateTime: "@datetime",
      // comment_disabled: true,
      // pageviews: "@integer(300, 5000)",
      // image_uri,
      // platforms: ["a-platform"],
    });
  });

export const draftCreate = (req: any) => {
  const reqBody: ReqDataArticleDraftCreate = JSON.parse(req.body);
  const _id = listIndex++;
  list.push(
    Mock.mock({
      id: _id,
      timestamp: +Mock.Random.date("T"),
      // author: "@first",
      // title: "@title(5, 10)",
      // content: baseContent,
      hot: "@integer(0, 5)",
      dateTime: "@datetime",
      ...reqBody,
      publishStatus: "draft",
    })
  );
  return resFn<ResDataArticleDraftCreate>({ id: _id });
};
export const draftUpdate = (req: any) => {
  const reqBody: ReqDataArticleDraftUpdate = JSON.parse(req.body);
  list = list.map((item) => {
    if (item.id != reqBody.id) return item;
    return {
      ...item,
      ...reqBody,
    };
  });
  return resFn();
};
export const getList = (req: any) => {
  const reqBody: ReqDataArticleList = JSON.parse(req.body);
  reqBody.current = Number(reqBody.current);
  reqBody.pageSize = Number(reqBody.pageSize);
  const _start = (reqBody.current - 1) * reqBody.pageSize;
  const _end = _start + reqBody.pageSize;
  const _list = list.slice(_start, _end);
  return resFn<ResDataArticleList>({ list: _list, total: list.length });
};
