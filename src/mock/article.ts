import { articleInitialValue } from "@/model";
import Mock from "mockjs";
import { resFn } from "./utils";
//参考 https://github.com/PanJiaChen/vue-element-admin/blob/master/mock/article.js
// const image_uri = "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3";
let listIndex = 3;

const list: ArticleInfoItem[] = Array(2)
  .fill(1)
  .map(() => {
    return Mock.mock({
      id: "@increment",
      timestamp: +Mock.Random.date("T"),
      author: "@first",
      // reviewer: "@first",
      title: "@title(5, 10)",
      // content_short: "mock data",
      markdown: articleInitialValue,
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

export const create = (req: any) => {
  const reqBody: ReqDataArticleCreate = JSON.parse(req.body);
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
    })
  );
  return resFn<ResDataArticleCreate>({ id: _id });
};
export const update = (req: any) => {
  const reqBody: ReqDataArticleUpdate = JSON.parse(req.body);
  list.forEach((item, index) => {
    if (item.id == reqBody.id) list[index] = { ...item, ...reqBody };
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
export const info = (req: any) => {
  const reqBody: ReqDataArticleInfo = JSON.parse(req.body);
  const _info = list.filter((item) => item.id == reqBody.id)[0];
  return resFn<ResDataArticleInfo>(_info);
};
