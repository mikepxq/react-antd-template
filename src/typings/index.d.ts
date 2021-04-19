/**统一响应结构 */
type ApiRes<T> = {
  code: number;
  data: T;
  message?: string;
};
