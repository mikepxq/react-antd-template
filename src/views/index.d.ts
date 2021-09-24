/* eslint-disable @typescript-eslint/no-explicit-any */
/** 全局视图props */
type ViewProps<T = any> = {
  className?: string;
  to?: RouteItem; //
} & { [key in keyof T]: T[key] };
