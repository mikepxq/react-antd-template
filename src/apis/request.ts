import { patternMap } from "@/model";
import { MockApiSleepTime } from "@/model/config";
import { sleep } from "@/utils";
import axios from "axios";
import { ErrorMiddleware } from "./error";
const axiosInstance = axios.create({
  baseURL: "",
  timeout: 10000,
  // headers:{}
});
/**请求拦截 */
axiosInstance.interceptors.request.use(
  (config) => {
    /** */
    return { ...config, token: localStorage.getItem("token") || "" };
  }
  // (err) => {}
);
/**响应拦截 */
axiosInstance.interceptors.response.use(
  async (res) => {
    // console.log("[res]", res);
    if (patternMap.mockApi.test(res.config.url || "")) {
      await sleep(MockApiSleepTime); //模拟加载时间
      // console.log(`[${res.config.url}]`, "[res.data]", res.data);
    }
    //减少一层级
    return ErrorMiddleware(res.data as ApiRes) as any; //取消axios的检查
  },
  (err) => {
    console.log("err :>> ", err);
    /**
     * 全局用 code 判断交互
     * 就不用 Promise.catch()去捕获错误，因为当错误时，不捕获，不会执行接着的程序。
     * 比如：refForm.value.validate().catch(() => {});
     */
    return ErrorMiddleware({
      code: 7000,
      message: "网络错误",
      data: undefined,
    });
  }
);
/**get 方式请求 */
export const requestGet = (url: string, data?: ApiData): Promise<ApiRes> => {
  return axiosInstance({
    url,
    method: "get",
    params: data,
  }) as unknown as Promise<ApiRes>;
};
export const requestPost = (url: string, data?: ApiData): Promise<ApiRes> => {
  return axiosInstance({
    url,
    method: "post",
    data,
  }) as unknown as Promise<ApiRes>;
};

/**参照：
 * https://www.kancloud.cn/yunye/axios/234845
 */
