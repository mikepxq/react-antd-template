/* eslint-disable @typescript-eslint/no-explicit-any */
/** 全局视图props */
type ViewsProps<T = any> = {
  className?: string;
} & { [key in keyof T]: any };
