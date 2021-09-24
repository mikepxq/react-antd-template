import { patternMap } from "@/model";
import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "",
  timeout: 10000,
  // headers:{}
});
/**请求拦截 */
axiosInstance.interceptors.request.use(
  (config) => {
    /** */
    return config;
  }
  // (err) => {}
);
/**响应拦截 */
axiosInstance.interceptors.response.use(
  (res) => {
    if (patternMap.mockApi.test(res.config.url || "")) {
      console.log("[res.data]", res.data);
    }
    //减少一层级

    return res.data;
  },
  (err) => {
    console.log("err :>> ", err);
    /**
     * 全局用 code 判断交互
     * 就不用 Promise.catch()去捕获错误，因为当错误时，不捕获，不会执行接着的程序。
     * 比如：refForm.value.validate().catch(() => {});
     */

    return Promise.resolve({
      code: 7000,
      message: "网络错误",
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
