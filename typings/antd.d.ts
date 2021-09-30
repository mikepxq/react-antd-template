export * from "antd";
import type { ArgsProps as _ArgsProps } from "node_modules/antd/lib/message/index.d.ts";
// import {}
export type ArgsProps = _ArgsProps;

declare global {
  namespace Antd {
    /** 重写 可以提示key值 */
    export type TableColumnsType<Item = Record<string, any>> = {
      key: keyof Item;
      dataIndex: keyof Item;
      title?: React.ReactNode;
      //用哪个补上那个
    }[];
  }
}
export as namespace Antd;
